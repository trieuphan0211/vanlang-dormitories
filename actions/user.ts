"use server";
import { deleteUser, updateUser } from "@/data/users";
import { UserSchema } from "@/schema";
import * as z from "zod";

export const removeUser = async (id: string) => {
  try {
    console.log("id1: ", id);
    const response = await deleteUser(id);
    if (response) {
      console.log("User is removed!");
      return { success: "User is removed!" };
    } else {
      return { error: "User is not found!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const updateUserById = async (
  id: string,
  value: z.infer<typeof UserSchema>,
) => {
  const validateValue = UserSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { name, role } = validateValue.data;
  try {
    const branch = await updateUser(id, {
      name,
      role,
    });
    return { success: "Branch is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
