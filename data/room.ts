import { db } from "@/lib/db";
interface ROOM {
  code: string;
  description?: string;
  branchId: string;
  floor: number;
  roomTypeCode: string;
}
export const getRoomById = async (id: string) => {
  try {
    const room = await db.room.findUnique({
      where: { id },
      include: { branch: true, roomType: true },
    });
    return room;
  } catch (e) {
    console.error(e);
  }
};

export const getFilterRooms = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const rooms = await db.room.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            code: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        branch: true,
        roomType: true,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return rooms;
  } catch (e) {
    console.error(e);
  }
};

export const getCountRoom = async (query: string) => {
  try {
    const count = await db.room.count({
      where: {
        OR: [
          {
            code: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
    });
    return count;
  } catch (e) {
    console.error(e);
  }
};

export const createRooms = async (fields: ROOM[]) => {
  try {
    const rooms = await db.room.createMany({
      data: fields,
    });
    return rooms;
  } catch (e) {
    console.error(e);
  }
};
export const deleteRoom = async (id: string) => {
  try {
    const response = await db.room.delete({ where: { id } });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const updateRoom = async (id: string, fields: ROOM) => {
  try {
    const response = await db.room.update({
      where: { id },
      data: fields,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
