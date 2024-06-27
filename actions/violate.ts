"use server";

import {
  createViolate,
  deleteViolate,
  getViolateByDate,
  getViolateById,
  updateViolate,
} from "@/data/violate";
import { ViolateSchema } from "@/schema";
import * as z from "zod";
import { createInvoiceForViolate } from "./invoice";
import { StatusViolate, ViolateType } from "@prisma/client";
import { getAllViolateTypes, getViolateTypeByCode } from "@/data/violate-type";
import { sendViolateEmail } from "@/lib/mail";
import { STUDENT, VIOLATE } from "@/types";
import {
  getStudentById,
  updateRoomDate,
  updateStudentPoint,
} from "@/data/student";
import { removeRoomOfStudent } from "./student";
import { getViolareTypesAll } from "./violateType";
import { get } from "http";

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
            student?.id,
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

export const getViolateForDashboard = async (
  branchId?: string,
  startDate?: string,
  finishDate?: string,
) => {
  const year = [] as number[];
  const violateTypes = [] as string[];
  const getViolateTypes = await getAllViolateTypes();
  const violates = await getViolateByDate({
    branchId,
    startDate,
    finishDate,
  });
  violates?.map((violate) => {
    if (!year.includes(new Date(violate.updateDate).getFullYear())) {
      year.push(new Date(violate.updateDate).getFullYear());
    }
  });
  violates?.map((violate) => {
    if (!violateTypes.includes(violate.typeViolateCode)) {
      violateTypes.push(violate.typeViolateCode);
    }
  });
  const result = [] as {
    month: string;
    violateType: string;
    status: { CREATED: number; INPROGRESS: number; FINISHED: number };
  }[];
  violateTypes?.map((violateType) => {
    year.map((year) => {
      Array.from({ length: 12 }).map((z, index) => {
        const newMaintainance = violates
          ?.filter(
            (violate) => new Date(violate.updateDate).getFullYear() === year,
          )
          .filter(
            (violate) => new Date(violate.updateDate).getMonth() === index,
          )
          .filter((violate) => violate.typeViolateCode === violateType);
        if ((newMaintainance?.length || 0) > 0) {
          result.push({
            month: index + 1 + "/" + year,
            violateType:
              getViolateTypes?.filter((item) => item.code === violateType)[0]
                ?.name || "",
            status: {
              CREATED:
                newMaintainance?.filter((item) => item.status === "CREATED")
                  .length || 0,
              INPROGRESS:
                newMaintainance?.filter((item) => item.status === "INPROGRESS")
                  .length || 0,
              FINISHED:
                newMaintainance?.filter((item) => item.status === "FINISHED")
                  .length || 0,
            },
          });
        }
      });
    });
  });
  return result;
};
