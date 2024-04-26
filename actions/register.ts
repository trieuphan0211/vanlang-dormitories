"use server";
import { createRegisterById, updateRegister } from "@/data/register";

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
    return { success: "Register is created!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
