"use server";

import {
  createRoomType,
  deleteRoomType,
  updateRoomType,
} from "@/data/room-type";
import { RoomTypeSchema } from "@/schema";
import crypto from "crypto";
import * as z from "zod";

export const addRoomType = async (value: z.infer<typeof RoomTypeSchema>) => {
  const validateValue = RoomTypeSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { roomTypeName, members, description, cost } = validateValue.data;
  const token = "RT" + crypto.randomInt(100_000, 1_000_000).toString();
  console.log(token);
  try {
    await createRoomType({
      name: roomTypeName,
      members: Number(members),
      description: description || "",
      code: token,
      cost: Number(cost),
    });
    return { success: "Room type is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeRoomType = async (id: string) => {
  try {
    await deleteRoomType(id);
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
  const { roomTypeName, members, description, cost } = validateValue.data;
  try {
    const roomType = await updateRoomType(id, {
      name: roomTypeName,
      members: Number(members),
      description: description || "",
      cost: Number(cost),
    });
    console.log(roomType);
    if (roomType) {
      return { success: "RoomType is updated!" };
    } else {
      return { error: "An error occurred!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
