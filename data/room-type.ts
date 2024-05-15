import { db } from "@/lib/db";

interface ROOMTYPE {
  name: string;
  members: number;
  description: string;
  code: string;
  cost: number;
}
export const getRoomTypesAll = async () => {
  try {
    const roomTypes = await db.roomType.findMany();
    return roomTypes;
  } catch (e) {
    console.error(e);
  }
};

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
  members: number,
  roomTypeCode: string,
  cost: number,
  description: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const search = [];
    query &&
      search.push({
        name: {
          contains: query,
          mode: "insensitive",
        },
      });
    roomTypeCode &&
      search.push({
        code: {
          contains: roomTypeCode,
          mode: "insensitive",
        },
      });
    members &&
      search.push({
        members: {
          equals: members,
        },
      });
    cost &&
      search.push({
        cost: {
          equals: cost,
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
          mode: "insensitive",
        },
      });
    const roomTypes = await db.roomType.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
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
export const getCountRoomtypes = async (
  query: string,
  members: number,
  roomTypeCode: string,
  cost: number,
  description: string,
) => {
  try {
    const search = [];
    query &&
      search.push({
        name: {
          contains: query,
          mode: "insensitive",
        },
      });
    roomTypeCode &&
      search.push({
        code: {
          contains: roomTypeCode,
          mode: "insensitive",
        },
      });
    members &&
      search.push({
        members: {
          equals: members,
        },
      });
    cost &&
      search.push({
        cost: {
          equals: cost,
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
          mode: "insensitive",
        },
      });
    const count = await db.roomType.count({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
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
    const roomType = await db.roomType.delete({ where: { id } });
    return roomType;
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
    cost: number;
  },
) => {
  try {
    const roomType = await db.roomType.update({ where: { id }, data: fields });
    return roomType;
  } catch (e) {
    console.error(e);
  }
};
