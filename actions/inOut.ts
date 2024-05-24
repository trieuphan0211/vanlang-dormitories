"use server";

import { createInOut } from "@/data/in-out";
import { StatusInOut } from "@prisma/client";

export const addCheckInOut = async (data: {
  studentId: string;
  status: StatusInOut;
}) => {
  try {
    const create = await createInOut({
      studentId: data.studentId,
      status: data.status,
    });
    return create;
  } catch (e) {
    console.error(e);
  }
};
