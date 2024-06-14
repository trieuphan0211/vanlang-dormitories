"use server";

import { createViolate, deleteViolate, updateViolate } from "@/data/violate";
import { ViolateSchema } from "@/schema";
import * as z from "zod";
import { createInvoiceForViolate } from "./invoice";

export const addviolate = async (
  value: z.infer<typeof ViolateSchema>,
  items: string,
) => {
  const validateValue = ViolateSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { violateName, description, studentId, date, violateTypeCode } =
    validateValue.data;
  try {
    const res = await createViolate({
      name: violateName,
      description: description || "",
      studentId: studentId,
      metaData: items,
      date,
      typeViolateCode: violateTypeCode,
    });

    if (res) {
      if (items) {
        const invoice = await createInvoiceForViolate({
          studentId: studentId,
          violateId: res.id,
          items: items,
        });
        if (!invoice) {
          return { error: "An error occurred!" };
        }
      }
      return { success: "Violate is created!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateViolateById = async (
  id: string,
  value: z.infer<typeof ViolateSchema>,
  item: string,
) => {
  const validateValue = ViolateSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { violateName, description, studentId, violateTypeCode } =
    validateValue.data;
  try {
    const res = await updateViolate(id, {
      name: violateName,
      description: description || "",
      studentId: studentId,
      typeViolateCode: violateTypeCode,
      metaData: item,
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
export const changeStatusViolateById = async (id: string) => {
  try {
    const res = await updateViolate(id, { status: "FINISHED" });
    if (res) {
      return { success: "Violate is confirmed!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
