"use server";

import {
  createFacilities,
  deleteFacilities,
  updateFacilities,
} from "@/data/facilities";
import { FacilitiesSchema } from "@/schema";
import * as z from "zod";
import crypto from "crypto";

export const addFacilities = async (
  value: z.infer<typeof FacilitiesSchema>,
) => {
  const validateValue = FacilitiesSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { name, description, facilitiesTypeCode, branchId, count } =
    validateValue.data;
  const genetateCode =
    "FOB" +
    "-" +
    facilitiesTypeCode.replace("FT", "") +
    "-" +
    crypto.randomInt(100, 1_000).toString();
  const facilities = Array.from({ length: Number(count) }).map(
    (value, index) => ({
      name,
      description,
      facilitiesTypeCode,
      branchId: branchId || undefined,
      code: genetateCode + "-" + index,
    }),
  );
  try {
    console.log("facilities: ", facilities);
    await createFacilities(facilities);
    return { success: "Facilities is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeFacilities = async (id: string) => {
  try {
    const response = await deleteFacilities(id);
    if (response) {
      console.log("Facilities is removed!");
      return { success: "Facilities is removed!" };
    } else {
      return { error: "Facilities is not found!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const updateFacilityById = async (
  id: string,
  value: z.infer<typeof FacilitiesSchema>,
) => {
  const validateValue = FacilitiesSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { name, facilitiesTypeCode, branchId, description, status, code } =
    validateValue.data;
  try {
    const response = await updateFacilities(id, {
      name,
      facilitiesTypeCode,
      branchId,
      description,
      status,
      code,
    });
    if (response) {
      return { success: "facilities is updated!" };
    } else {
      return { error: "facilitites is error" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
