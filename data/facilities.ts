import { db } from "@/lib/db";
import { StatusFacilities } from "@prisma/client";

interface FACILITIES {
  name: string;
  description?: string;
  code: string;
  facilitiesTypeCode: string;
  branchId?: string;
  img?: string[];
  status?: StatusFacilities;
}
export const getFacilitiesAll = async () => {
  try {
    const facilities = await db.facilities.findMany({
      include: {
        branch: true,
        facilitiesType: true,
      },
    });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};

export const getFacilitiesById = async (id: string) => {
  try {
    const facilities = await db.facilities.findUnique({
      where: {
        id,
      },
      include: {
        branch: true,
      },
    });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterFacilities = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const facilities = await db.facilities.findMany({
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
            facilitiesType: {
              name: {
                contains: query,
              },
            },
          },
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
          {
            branchId: {
              contains: query,
            },
          },
          {
            facilitiesTypeCode: {
              contains: query,
            },
          },
        ],
      },
      include: {
        branch: true,
        facilitiesType: true,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};
export const getCountFacilities = async (query: string) => {
  try {
    const count = await db.facilities.count({
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
            code: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },

          {
            branchId: {
              contains: query,
            },
          },
          {
            facilitiesTypeCode: {
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
export const createFacilities = async (fields: FACILITIES[]) => {
  try {
    const facilities = await db.facilities.createMany({ data: fields });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};
export const deleteFacilities = async (id: string) => {
  try {
    console.log("id: ", id);
    const facilities = await db.facilities.delete({ where: { id } });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};
export const updateFacilities = async (
  id: string,
  fields: {
    name: string;
    facilitiesTypeCode: string;
    branchId?: string;
    description?: string;
    status?: StatusFacilities;
    code?: string;
  },
) => {
  try {
    const facilities = await db.facilities.update({
      where: { id },
      data: fields,
    });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};
