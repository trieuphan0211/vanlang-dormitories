"use server";
import {
  createViolateType,
  deleteViolateTypeById,
  getAllViolateTypes,
  updateViolateTypeById,
} from "@/data/violate-type";
import { ViolateTypeSchema } from "@/schema";
import crypto from "crypto";
import * as z from "zod";

export const addViolateType = async (
  value: z.infer<typeof ViolateTypeSchema>,
) => {
  const validateValue = ViolateTypeSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { violateTypeName, allow, point, description } = validateValue.data;
  const token = "VT" + crypto.randomInt(1_000, 10_000).toString();
  try {
    const res = await createViolateType({
      name: violateTypeName,
      description: description || "",
      point: Number(point),
      code: token,
      allow,
    });
    if (res) return { success: "Violate Type is created!" };
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const deleteViolateType = async (id: string) => {
  try {
    const res = await deleteViolateTypeById(id);
    if (res) {
      return { success: "Violate Type is deleted!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

// Path: actions/violate.ts
export const updateViolateType = async (
  id: string,
  data: z.infer<typeof ViolateTypeSchema>,
) => {
  try {
    const validateValue = ViolateTypeSchema.safeParse(data);
    if (!validateValue.success) {
      return { error: "Invalid Values!" };
    }
    const { violateTypeName, allow, point, description } = validateValue.data;
    const res = await updateViolateTypeById(id, {
      name: violateTypeName,
      description: description || "",
      point: Number(point),
      allow,
    });
    if (res) {
      return { success: "Violate Type is updated!" };
    }
    return { error: "An error occurred!" };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred!" };
  }
};

export const getViolareTypesAll = async () => {
  try {
    const violateTypes = await getAllViolateTypes();
    if (violateTypes) {
      return violateTypes;
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
