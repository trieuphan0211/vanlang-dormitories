"use server";
import { updateRegister } from "@/data/register";

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
