"use server";
import {
  createRegisterById,
  getCountRegisterStatus,
  getFilterRegister,
  getRegisterById,
  updateRegister,
} from "@/data/register";
import { getStudentByEmail, updateStudentInRoom } from "@/data/student";
import { sendRegisterEmail } from "@/lib/mail";
import { REGISTER } from "@/types";

export const cancelRegister = async (id: string) => {
  try {
    const res = await updateRegister(id, {
      status: 2,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Register is canceled!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
export const createRegister = async (data: any) => {
  try {
    console.log(data);
    const res = await createRegisterById({
      roomId: data.roomId,
      registerdeadline: data.year,
      studentEmail: data.email,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    // send email to student

    if (res?.id === undefined) return { error: "An error occurred!" };
    const register = (await getRegisterById(res.id)) as REGISTER;
    const sendMail = await sendRegisterEmail(register);
    if (sendMail === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Register is created!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
export const createExtensionRegister = async (data: any) => {
  try {
    const res = await createRegisterById({
      roomId: data.roomId,
      registerdeadline: data.year,
      studentEmail: data.email,
      status: 3,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    const student = await getStudentByEmail(data.email);
    if (student?.id === undefined) {
      return { error: "An error occurred!" };
    }
    const updateDateRoom = await updateStudentInRoom(
      student.id,
      data.roomId,
      new Date(data.allowRegister),
    );
    if (updateDateRoom === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Register is created!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
export const getRegisterByStatus = async (email: string, status: number) => {
  const student = await getFilterRegister(
    "",
    "",
    "",
    0,
    status,
    "",
    1,
    10,
    email,
  );
  return student;
};

export const getRegisterForDashboard = async (
  branchId?: string,
  startDate?: string,
  finishDate?: string,
) => {
  const pedding = await getCountRegisterStatus({
    branchId,
    startDate,
    finishDate,
    status: 0,
  });
  const approved = await getCountRegisterStatus({
    branchId,
    startDate,
    finishDate,
    status: 1,
  });
  const canceled = await getCountRegisterStatus({
    branchId,
    startDate,
    finishDate,
    status: 2,
  });
  const extension = await getCountRegisterStatus({
    branchId,
    startDate,
    finishDate,
    status: 3,
  });
  return {
    pedding,
    approved,
    canceled,
    extension,
  };
};
