"use server";

import {
  deleteStudent,
  getStudentByEmail,
  updateStudent,
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
  const student = await getStudentByEmail(email);
  const user = await getUserByEmail(email);
  if (!student) return { error: "Student is not found!" };
  if (!user) return { error: "User is not found!" };
  try {
    // const response = await updateStudent(email, {
    //   bankAccount,
    //   bankBranch,
    //   bankName,
    //   bankNumber,
    //   brithday,
    //   cccdCode,
    //   cccdOfDate,
    //   cccdPlace,
    //   fullName,
    //   gender,
    //   major,
    //   nation,
    //   phone: Number(phone),
    //   religion,
    //   schoolYear: Number(schoolYear),
    //   studentCode,
    //   createDate: student?.createDate as Date,
    //   email: student?.email as string,
    //   id: student?.id as string,
    //   permanentResidence: JSON.stringify(permanentResidence),
    //   contactinfo: JSON.stringify(contactinfo),
    //   familiInfo: JSON.stringify(familiInfo),
    // });
    const userResponse = await updateUser(user.id, { verifiedInfo: true });
    // console.log("userResponse: ", response);
    // if (response) {
    return { success: "Student is updated!" };
    // } else {
    //   return { error: "Student is not found!" };
    // }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
