"use server";

import { createBranch, deleteBranch } from "@/data/branch";
import {
  createRoomType,
  deleteRoomType,
  updateRoomType,
} from "@/data/room-type";
import { RoomTypeSchema } from "@/schema";
import * as z from "zod";

export const addRoomType = async (value: z.infer<typeof RoomTypeSchema>) => {
  const validateValue = RoomTypeSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { roomTypeName, members, description } = validateValue.data;
  try {
    const roomType = await createRoomType({
      name: roomTypeName,
      members: Number(members),
      description,
    });
    return { success: "Room type is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeRoomType = async (id: string) => {
  try {
    const roomType = await deleteRoomType(id);
    console.log("RoomType is removed!");
    return { success: "Branch is removed!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateRoomTypeById = async (
  id: string,
  value: z.infer<typeof RoomTypeSchema>,
) => {
  const validateValue = RoomTypeSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { roomTypeName, members, description } = validateValue.data;
  try {
    const branch = await updateRoomType(id, {
      name: roomTypeName,
      members: Number(members),
      description,
    });
    return { success: "Branch is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
