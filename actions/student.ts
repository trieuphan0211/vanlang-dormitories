"use server";

import { deleteStudent } from "@/data/student";

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
