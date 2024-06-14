import { db } from "@/lib/db";

export const getBranchById = async (id: string) => {
  try {
    const branch = await db.branch.findUnique({
      where: {
        id,
      },
    });
    return branch;
  } catch (e) {
    console.error(e);
  }
};
export const getAllBranchs = async () => {
  try {
    const branchs = await db.branch.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
    });
    return branchs;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterBranchs = async (
  query: string,
  address: string,
  numberFloors: number,
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
    address &&
      search.push({
        address: {
          contains: address,
          mode: "insensitive",
        },
      });
    numberFloors &&
      search.push({
        floorNumber: {
          equals: numberFloors,
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
        },
      });
    const branchs = await db.branch.findMany({
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
    return branchs;
  } catch (e) {
    console.error(e);
  }
};

export const getBranchByFields = async (fields: {
  name: string;
  address?: string;
  floorNumber?: number;
  description?: string;
}) => {
  try {
    const branch = await db.branch.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: fields,
    });
    return branch;
  } catch (e) {
    console.error(e);
  }
};
export const getCountBranchs = async (
  query: string,
  address: string,
  numberFloors: number,
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
    address &&
      search.push({
        address: {
          contains: address,
          mode: "insensitive",
        },
      });
    numberFloors &&
      search.push({
        floorNumber: {
          equals: numberFloors,
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
        },
      });
    const count = await db.branch.count({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: [...search] as Array<any>,
      },
    });
    return count;
  } catch (e) {
    console.error(e);
  }
};
export const createBranch = async (fields: {
  name: string;
  address: string;
  floorNumber: number;
  description?: string;
  img?: string;
}) => {
  console.log(fields, "fields");
  try {
    const branch = await db.branch.create({ data: fields });
    return branch;
  } catch (e) {
    console.error(e);
  }
};
export const deleteBranch = async (id: string) => {
  try {
    const branch = await db.branch.delete({ where: { id } });
    return branch;
  } catch (e) {
    console.error(e);
  }
};

export const updateBranch = async (
  id: string,
  fields: {
    name: string;
    address: string;
    floorNumber: number;
    description?: string;
    img?: string;
  },
) => {
  try {
    const branch = await db.branch.update({ where: { id }, data: fields });
    return branch;
  } catch (e) {
    console.error(e);
  }
};
