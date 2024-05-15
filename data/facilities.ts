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

export const getFacilitiesByCodes = async (code: string) => {
  try {
    const facilities = await db.facilities.findUnique({
      where: {
        code,
      },
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
        facilitiesType: true,
      },
    });
    return facilities;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterFacilities = async (
  query: string,
  facilitiesCode: string,
  branchName: string,
  facilitiesTypeCode: string,
  facilitiesTypeName: string,
  status: string,
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
    facilitiesCode &&
      search.push({
        code: {
          contains: facilitiesCode,
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
    facilitiesTypeCode &&
      search.push({
        facilitiesTypeCode: {
          contains: facilitiesTypeCode,
          mode: "insensitive",
        },
      });
    facilitiesTypeName &&
      search.push({
        facilitiesType: {
          name: {
            contains: facilitiesTypeName,
            mode: "insensitive",
          },
        },
      });
    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
        },
      });
    const facilities = await db.facilities.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
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
export const getCountFacilities = async (
  query: string,
  facilitiesCode: string,
  branchName: string,
  facilitiesTypeCode: string,
  facilitiesTypeName: string,
  status: string,
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
    facilitiesCode &&
      search.push({
        code: {
          contains: facilitiesCode,
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
    facilitiesTypeCode &&
      search.push({
        facilitiesTypeCode: {
          contains: facilitiesTypeCode,
          mode: "insensitive",
        },
      });
    facilitiesTypeName &&
      search.push({
        facilitiesType: {
          name: {
            contains: facilitiesTypeName,
            mode: "insensitive",
          },
        },
      });
    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
        },
      });
    const count = await db.facilities.count({
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
    name?: string;
    facilitiesTypeCode?: string;
    branchId?: string;
    description?: string;
    status?: StatusFacilities;
    code?: string;
    createDate?: Date;
    maintenanceId?: string;
  },
) => {
  console.log("fields: ", fields);
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
