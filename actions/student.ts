"use server";

import { updateRegister } from "@/data/register";
import {
  deleteStudent,
  getAllStudents,
  updateStudent,
  updateStudentInRoom,
} from "@/data/student";
import { getUserByEmail, updateUser } from "@/data/users";
import { StudentInfoSchema } from "@/schema";
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
export const updateStudentInRoomById = async (
  id: string,
  roomId: string,
  registerId: string,
) => {
  try {
    const student = await updateStudentInRoom(id, roomId);
    if (student) {
      console.log("Student is updated!");
      const res = await updateRegister(registerId, { status: 1 });
      if (res === null) {
        return { error: "An error occurred!" };
      }
      console.log("Register is updated!");
      return { success: "Student is updated!" };
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
