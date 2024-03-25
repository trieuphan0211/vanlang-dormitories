import { db } from "@/lib/db";

interface ROOMTYPE {
  name: string;
  members: number;
  description: string;
  code: string;
}
export const getRoomTypeById = async (id: string) => {
  try {
    const roomType = await db.roomType.findUnique({ where: { id } });
    return roomType;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterRoomTypes = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const roomTypes = await db.roomType.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            members: {
              equals: Number(query) || undefined,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            code: {
              contains: query,
            },
          },
        ],
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return roomTypes;
  } catch (e) {
    console.error(e);
  }
};
export const getRoomTypeByFields = async (fields: {
  name: string;
  members?: number;
  description?: string;
}) => {
  try {
    const roomTypes = await db.roomType.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: fields,
    });
    return roomTypes;
  } catch (e) {
    console.error(e);
  }
};
export const getCountRoomtypes = async (query: string) => {
  try {
    const count = await db.roomType.count({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            members: {
              equals: Number(query) || undefined,
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
export const createRoomType = async (fields: ROOMTYPE) => {
  try {
    const roomType = await db.roomType.create({ data: fields });
    return roomType;
  } catch (e) {
    console.error(e);
  }
};
export const deleteRoomType = async (id: string) => {
  try {
    const branch = await db.roomType.delete({ where: { id } });
    return branch;
  } catch (e) {
    console.error(e);
  }
};

export const updateRoomType = async (
  id: string,
  fields: {
    name: string;
    members: number;
    description: string;
  },
) => {
  try {
    const roomTypes = await db.roomType.update({ where: { id }, data: fields });
    return roomTypes;
  } catch (e) {
    console.error(e);
  }
};
