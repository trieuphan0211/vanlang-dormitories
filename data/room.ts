import { db } from "@/lib/db";
import { equal } from "assert";
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
    console.log("rooms", rooms);
    return rooms;
  } catch (e) {
    console.error(e);
  }
};

export const getFilterRooms = async (
  query: string,
  numberFloors: number,
  roomType: string,
  branchName: string,
  description: string,
  currentPage: number,
  entries: number,
) => {
  const search = [];
  query &&
    search.push({
      code: {
        contains: query,
        mode: "insensitive",
      },
    });
  numberFloors &&
    search.push({
      floor: {
        equals: numberFloors,
      },
    });

  roomType &&
    search.push({
      roomType: {
        OR: [
          {
            name: {
              contains: roomType,
              mode: "insensitive",
            },
          },
          {
            code: {
              contains: roomType,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  description &&
    search.push({
      description: {
        contains: description,
        mode: "insensitive",
      },
    });
  branchName &&
    search.push({
      branch: {
        name: {
          contains: branchName,
          mode: "insensitive",
        },
      },
    });
  try {
    const rooms = await db.room.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
        {
          code: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
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
      include: {
        branch: true,
        roomType: true,
        Services: true,
        Student: true,
        Register: true,
      },
      orderBy: [
        {
          floor: "asc",
        },
        {
          code: "asc",
        },
      ],
    });
    return rooms;
  } catch (e) {
    console.error(e);
  }
};
export const getCountRoom = async (
  query: string,
  numberFloors: number,
  roomType: string,
  branchName: string,
  description: string,
) => {
  try {
    const search = [];
    query &&
      search.push({
        code: {
          contains: query,
          mode: "insensitive",
        },
      });
    numberFloors &&
      search.push({
        floor: {
          equals: numberFloors,
        },
      });

    roomType &&
      search.push({
        roomType: {
          OR: [
            {
              name: {
                contains: roomType,
                mode: "insensitive",
              },
            },
            {
              code: {
                contains: roomType,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
          mode: "insensitive",
        },
      });
    branchName &&
      search.push({
        branch: {
          name: {
            contains: branchName,
            mode: "insensitive",
          },
        },
      });
    const count = await db.room.count({
      where: {
        AND: search as Array<any>,
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
    console.log("rooms", rooms);
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
    await db.serviceOnRoom.deleteMany({
      where: {
        roomId: id,
      },
    });
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
