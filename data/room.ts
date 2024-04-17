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
      include: {
        branch: true,
        roomType: true,
        Services: {
          include: {
            service: true,
          },
        },
        Student: true,
      },
    });
    return room;
  } catch (e) {
    console.error(e);
  }
};

export const getRoomsAllHaveStudents = async () => {
  try {
    const rooms = await db.room.findMany({
      where: {
        Student: {
          some: {},
        },
      },

      include: {
        branch: true,
        roomType: true,
        Services: {
          include: {
            service: true,
          },
        },
        Student: true,
      },
    });
    return rooms;
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
export const getRoomsByFields = async (
  roomTypesCode?: string,
  branchId?: string,
) => {
  try {
    const rooms = await db.room.findMany({
      where: {
        roomTypeCode: roomTypesCode,
        branchId,
      },
      include: { branch: true, roomType: true, Services: true },
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

export const createRooms = async (fields: ROOM[], services?: string[]) => {
  try {
    const rooms = fields.map(async (room) => {
      return await db.room.create({
        data: {
          ...room,
          Services: {
            create: services?.map((service) => {
              return { serviceId: service };
            }),
          },
        },
      });
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

export const updateRoom = async (
  id: string,
  fields: ROOM,
  services?: string[],
) => {
  try {
    const response = await db.room.update({
      where: { id },
      data: {
        ...fields,
        Services: {
          create: services?.map((service) => ({ serviceId: service })),
        },
      },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
