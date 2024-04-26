"use server";

import {
  createRooms,
  deleteRoom,
  getRoomsByFields,
  updateRoom,
} from "@/data/room";
import { db } from "@/lib/db";
import { RoomSchema } from "@/schema";
import * as z from "zod";

export const addRooms = async (value: z.infer<typeof RoomSchema>) => {
  const validateValue = RoomSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { roomTypeCode, description, branchId, floor, count, services } =
    validateValue.data;
  console.log("floor: ", validateValue.data);
  const currentRooms = await db.room.findMany({
    orderBy: [
      {
        code: "desc",
      },
    ],
    where: {
      branchId: branchId,
      floor: Number(floor),
    },
  });
  const nextCode =
    currentRooms.length > 0
      ? Number(currentRooms[0].code.replace(`P${floor}`, ""))
      : 0;
  console.log("nextCode: ", nextCode);
  const rooms = Array.from({ length: Number(count) }).map((value, index) => ({
    roomTypeCode,
    description,
    branchId: branchId,
    code:
      "P" +
      floor +
      (nextCode + index + 1 < 10
        ? "0" + (nextCode + index + 1)
        : nextCode + index + 1),
    floor: Number(floor),
  }));
  try {
    const res = await createRooms(rooms, services);
    if (res) {
      return {
        success: "Rooms is created!",
      };
    } else {
      return { error: "An error occurred!" };
    }
    // return { success: "Rooms is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeRoom = async (id: string) => {
  try {
    const response = await deleteRoom(id);
    if (response) {
      console.log("Room is removed!");
      return { success: "Room is removed!" };
    } else {
      return { error: "Room is not found!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateRoomById = async (
  id: string,
  value: z.infer<typeof RoomSchema>,
) => {
  const validateValue = RoomSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { roomTypeCode, branchId, description, floor, code, services } =
    validateValue.data;
  try {
    const room = await updateRoom(
      id,
      {
        roomTypeCode,
        branchId,
        description,
        floor: Number(floor),
        code: code as string,
      },
      services,
    );
    if (room) {
      return { success: "Room is updated!" };
    } else {
      return { error: "Room is not found!" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const getRoomByBranchIdAndRoomTypeCode = async (
  branchId: string,
  roomTypeCode: string,
) => {
  const rooms = await getRoomsByFields(roomTypeCode, branchId);
  return rooms;
};
