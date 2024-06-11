import { db } from "@/lib/db";
import { ViolateType } from "@prisma/client";

export const getViolateTypeById = async (id: string) => {
  try {
    const violateType = await db.violateType.findUnique({ where: { id } });
    return violateType;
  } catch (e) {
    console.error(e);
  }
};

export const getAllViolateTypes = async () => {
  try {
    const violateType = await db.violateType.findMany();
    return violateType;
  } catch (e) {
    console.error(e);
  }
};

export const getFilterViolateTypes = async (
  query: string,
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

    const violateType = await db.violateType.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return violateType;
  } catch (e) {
    console.error(e);
  }
};

export const getCountViolatetypes = async (query: string) => {
  try {
    const search = [];
    query &&
      search.push({
        name: {
          contains: query,
          mode: "insensitive",
        },
      });

    const count = await db.violateType.count({
      orderBy: [
        {
          updateDate: "desc",
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

export const createViolateType = async (data: {
  name: string;
  description?: string;
  code: string;
  point: number;
  allow: boolean;
}) => {
  try {
    const violateType = await db.violateType.create({ data });
    return violateType;
  } catch (e) {
    console.error(e);
  }
};

export const deleteViolateTypeById = async (id: string) => {
  try {
    const violateType = await db.violateType.delete({ where: { id } });
    return violateType;
  } catch (e) {
    console.error(e);
  }
};

export const updateViolateTypeById = async (
  id: string,
  data: {
    name: string;
    description: string;
    point: number;
    allow: boolean;
  },
) => {
  try {
    const violateType = await db.violateType.update({
      where: { id },
      data,
    });
    return violateType;
  } catch (e) {
    console.error(e);
  }
};
