"use server";

import {
  createFacilitiesType,
  deleteFacilitiesType,
  getAllFacilitiesTypes,
  updateFacilitiesType,
} from "@/data/facilities-type";
import { FacilitiesTypeSchema } from "@/schema";
import crypto from "crypto";
import * as z from "zod";

export const getFacilitiesTypeAll = async () => {
  try {
    const facilitiesType = await getAllFacilitiesTypes();
    return facilitiesType;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addFacilitiesType = async (
  value: z.infer<typeof FacilitiesTypeSchema>,
) => {
  const validateValue = FacilitiesTypeSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { facilitesTypeName, description } = validateValue.data;
  const token = "FT" + crypto.randomInt(100_000, 1_000_000).toString();
  console.log(token);
  try {
    await createFacilitiesType({
      name: facilitesTypeName,
      description,
      code: token,
    });
    return { success: "Facilities Type is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const removeFacilitiesType = async (id: string) => {
  try {
    await deleteFacilitiesType(id);
    console.log("Facilities Type is removed!");
    return { success: "Facilities Type is removed!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateFacilitiesTypeById = async (
  id: string,
  value: z.infer<typeof FacilitiesTypeSchema>,
) => {
  const validateValue = FacilitiesTypeSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { facilitesTypeName, description } = validateValue.data;
  try {
    const branch = await updateFacilitiesType(id, {
      name: facilitesTypeName,
      description,
    });
    return { success: "Facilities Type is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
