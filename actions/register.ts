"use server";
import {
  createRegisterById,
  getFilterRegister,
  getRegisterById,
  updateRegister,
} from "@/data/register";
import { updateRoomDate } from "@/data/room";
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
    const updateDateRoom = await updateRoomDate(
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
