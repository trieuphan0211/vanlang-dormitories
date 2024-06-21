"use server";

import {
  createViolate,
  deleteViolate,
  getViolateById,
  updateViolate,
} from "@/data/violate";
import { ViolateSchema } from "@/schema";
import * as z from "zod";
import { createInvoiceForViolate } from "./invoice";
import { StatusViolate, ViolateType } from "@prisma/client";
import { getViolateTypeByCode } from "@/data/violate-type";
import { sendViolateEmail } from "@/lib/mail";
import { STUDENT, VIOLATE } from "@/types";
import { getStudentById, updateStudentPoint } from "@/data/student";
import { removeRoomOfStudent } from "./student";
import { updateRoomDate } from "@/data/room";

export const addviolate = async (
  value: z.infer<typeof ViolateSchema>,
  items: string,
) => {
  const validateValue = ViolateSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { description, studentId, date, violateTypeCode, formProcessing } =
    validateValue.data;
  const violateType = (await getViolateTypeByCode(
    violateTypeCode,
  )) as ViolateType;
  try {
    // Create violate
    const data = {
      description: description || "",
      studentId: studentId,
      metaData: items,
      date,
      status:
        formProcessing === "REMINDED" ||
        (formProcessing === "WARNING" && !violateType.allow)
          ? StatusViolate.FINISHED
          : StatusViolate.CREATED,
      formProcessing,
      typeViolateCode: violateTypeCode,
    };
    // Create violate in database
    const res = await createViolate(data);

    if (res) {
      // Create invoice for violate
      if (items) {
        const invoice = await createInvoiceForViolate({
          studentId: studentId,
          violateId: res.id,
          items: items,
        });
        // Check if invoice is created
        if (!invoice) {
          await deleteViolate(res.id);
          return { error: "An error occurred!" };
        }
      }
      const student = (await getStudentById(res.studentId)) as STUDENT;
      if (student.point && student.point <= violateType.point) {
        // create violate for out dormitory
        const newData = {
          studentId: studentId,
          date: new Date().toISOString(),
          description: "Get Out dormitory",
          metaData: "",
          formProcessing: "DORMITORYEXPULSION",
          typeViolateCode: "VT6199",
          status: StatusViolate.FINISHED,
        };
        // Create violate in database
        const outDormitories = await createViolate(newData);
        // update point of student
        await updateStudentPoint(student.id, 0);

        if (!outDormitories) {
          return { error: "An error occurred!" };
        }
        // update room date
        if (student?.roomId) {
          await updateRoomDate(
            student?.roomId,
            new Date(new Date().setDate(new Date().getDate() + 5)),
          );
        }
        // remove room of student
        await removeRoomOfStudent(student.id);
        // send email to student
        const violate = (await getViolateById(outDormitories.id)) as VIOLATE;

        const sendEmail = await sendViolateEmail(violate);
        if (!sendEmail) {
          return { error: "An error occurred!" };
        }
        return { success: "Violate is created!" };
      } else {
        await updateStudentPoint(
          student.id,
          student.point ? student.point - violateType.point : 0,
        );
        const violate = (await getViolateById(res.id)) as VIOLATE;
        // send email to student
        const sendEmail = await sendViolateEmail(violate);
        if (!sendEmail) {
          return { error: "An error occurred!" };
        }
        return { success: "Violate is created!" };
      }
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateViolateById = async (
  id: string,
  value: z.infer<typeof ViolateSchema>,
  item: string,
) => {
  const validateValue = ViolateSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { description, studentId, violateTypeCode } = validateValue.data;
  try {
    const res = await updateViolate(id, {
      description: description || "",
      studentId: studentId,
      typeViolateCode: violateTypeCode,
      metaData: item,
    });
    if (res) {
      return { success: "Violate is updated!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const deleteViolateById = async (id: string) => {
  try {
    const res = await deleteViolate(id);
    if (res) {
      return { success: "Violate is deleted!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const changeStatusViolateById = async (id: string) => {
  try {
    const res = await updateViolate(id, { status: "FINISHED" });
    if (res) {
      return { success: "Violate is confirmed!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
