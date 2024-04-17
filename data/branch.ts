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
          createDate: "desc",
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
  currentPage: number,
  entries: number,
) => {
  try {
    const branchs = await db.branch.findMany({
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
            address: {
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
          createDate: "desc",
        },
      ],
      where: fields,
    });
    return branch;
  } catch (e) {
    console.error(e);
  }
};
export const getCountBranchs = async (query: string) => {
  try {
    const count = await db.branch.count({
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
            address: {
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
