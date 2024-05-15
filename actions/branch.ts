"use server";

import {
  createBranch,
  deleteBranch,
  getAllBranchs,
  updateBranch,
} from "@/data/branch";
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
    if (branch) {
      console.log("Branch is removed!", branch);
      return { success: "Branch is removed!" };
    } else {
      return { error: "An error occurred!" };
    }
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
    await updateBranch(id, {
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
export const getBranchsAll = async () => {
  try {
    const branchs = await getAllBranchs();
    return branchs;
  } catch (error) {
    console.error(error);
    return [];
  }
};
