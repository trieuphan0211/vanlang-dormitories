"use server";

import { getRegisterById, updateRegister } from "@/data/register";
import {
  deleteStudent,
  getAllStudents,
  getStudentsByEmail,
  updateStudent,
  updateStudentInRoom,
} from "@/data/student";
import { getUserByEmail, updateUser } from "@/data/users";
import { sendRegisterConfirmationEmail } from "@/lib/mail";
import { StudentInfoSchema } from "@/schema";
import { REGISTER } from "@/types";
import * as z from "zod";

export const removeStudent = async (id: string) => {
  try {
    const student = await deleteStudent(id);
    if (student) {
      console.log("Student is removed!");
      return { success: "Student is removed!" };
    }
    console.log("Student not found!");
    return { error: "Student not found!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const getStudentFromEmail = async (email: string) => {
  const student = await getStudentsByEmail(email);
  if (student) {
    return student;
  }
  return [];
};
export const getStudentsAll = async () => {
  try {
    const students = await getAllStudents();
    if (students) {
      return students;
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeRoomOfStudent = async (id: string) => {
  try {
    const student = await updateStudentInRoom(id, undefined);
    if (student) {
      console.log(student);
      console.log("Student is removed from room!");
      return { success: "Student is removed from room!" };
    }
    console.log("Student not found!");
    return { error: "Student not found!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateStudentInRoomById = async (
  id: string,
  roomId: string,
  registerId: string,
) => {
  try {
    // transfer status to 1
    const res = await updateRegister(registerId, { status: 1 });

    if (res) {
      console.log("Register is updated!");
      const student = await updateStudentInRoom(
        id,
        roomId,
        new Date(
          new Date().setMonth(
            new Date().getMonth() + res.registerdeadline * 12,
          ),
        ),
      );
      if (student === null) {
        return { error: "An error occurred!" };
      }
      console.log("Student is updated!");

      const register = (await getRegisterById(res.id)) as REGISTER;
      // send Email
      const sendMail = await sendRegisterConfirmationEmail(register);
      if (sendMail) {
        console.log("Email is sent!");
        return { success: "Student is updated!" };
      }
      return { error: "Email is not sent!" };
    }
    console.log("Student not found!");
    return { error: "Student not found!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const updateStudentByEmail = async (
  email: string,
  fields: z.infer<typeof StudentInfoSchema>,
) => {
  const validateFields = StudentInfoSchema.safeParse(fields);
  if (!validateFields.success) {
    return { error: "Invalid Values!" };
  }
  const {
    bankAccount,
    bankBranch,
    bankName,
    bankNumber,
    brithday,
    cccdCode,
    cccdOfDate,
    cccdPlace,
    fullName,
    contactinfo,
    familiInfo,
    gender,
    major,
    nation,
    phone,
    religion,
    schoolYear,
    studentCode,
    permanentResidence,
  } = validateFields.data;
  console.log("email", validateFields.data);
  const user = await getUserByEmail(email);
  if (!user) return { error: "User is not found!" };
  try {
    const response = await updateStudent(email, {
      bankAccount,
      bankBranch,
      bankName,
      bankNumber,
      brithday,
      cccdCode,
      cccdOfDate,
      cccdPlace,
      fullName,
      gender,
      major,
      nation,
      phone: Number(phone),
      religion,
      schoolYear: Number(schoolYear),
      studentCode,
      permanentResidence: JSON.stringify(permanentResidence),
      contactinfo: JSON.stringify(contactinfo),
      familiInfo: JSON.stringify(familiInfo),
      createDate: new Date(),
    });
    if (response) {
      console.log("Student is updated!");
      const userResponse = await updateUser(user.id, { verifiedInfo: true });
      if (userResponse) {
        console.log("User is updated!");

        return { success: "Student is updated!" };
      }
      return { error: "User is not updated!" };
    }
    console.log("Student is not found!");
    return { error: "Student is not found!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
