"use server";

import { createBranch, deleteBranch, updateBranch } from "@/data/branch";
import { BranchSchema } from "@/schema";
import * as z from "zod";

export const addBranch = async (value: z.infer<typeof BranchSchema>) => {
  const validateValue = BranchSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { name, address, numberFloors, description, image } =
    validateValue.data;
  try {
    const branch = await createBranch({
      name,
      address,
      floorNumber: Number(numberFloors),
      description,
      img: JSON.stringify(image),
    });
    return { success: "Branch is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeBranch = async (id: string) => {
  try {
    const branch = await deleteBranch(id);
    console.log("Branch is removed!");
    return { success: "Branch is removed!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const updateBranchById = async (
  id: string,
  value: z.infer<typeof BranchSchema>,
) => {
  const validateValue = BranchSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { name, address, numberFloors, description, image } =
    validateValue.data;
  try {
    const branch = await updateBranch(id, {
      name,
      address,
      floorNumber: Number(numberFloors),
      description,
      img: JSON.stringify(image),
    });
    return { success: "Branch is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
