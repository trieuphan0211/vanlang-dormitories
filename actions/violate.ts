"use server";

import { createViolate, deleteViolate, updateViolate } from "@/data/violate";
import { ViolateSchema } from "@/schema";
import * as z from "zod";

export const addviolate = async (value: z.infer<typeof ViolateSchema>) => {
  const validateValue = ViolateSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { violateName, description, studentId } = validateValue.data;
  try {
    const res = await createViolate({
      name: violateName,
      description: description || "",
      studentId: studentId,
    });
    if (res) {
      return { success: "Violate is created!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateViolateById = async (
  id: string,
  value: z.infer<typeof ViolateSchema>,
) => {
  const validateValue = ViolateSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { violateName, description, studentId } = validateValue.data;
  try {
    const res = await updateViolate(id, {
      name: violateName,
      description: description || "",
      studentId: studentId,
    });
    if (res) {
      return { success: "Violate is updated!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const deleteViolateById = async (id: string) => {
  try {
    const res = await deleteViolate(id);
    if (res) {
      return { success: "Violate is deleted!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
