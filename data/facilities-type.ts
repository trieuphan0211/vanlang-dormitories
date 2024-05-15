import { db } from "@/lib/db";

interface FACILITIESTYPE {
  name: string;
  description: string;
  code: string;
}
export const getAllFacilitiesTypes = async () => {
  try {
    const facilitiesTypes = await db.facilitiesType.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
    });

    return facilitiesTypes;
  } catch (e) {
    console.error(e);
  }
};
export const getFacilitiesTypeById = async (id: string) => {
  try {
    const facilitiesType = await db.facilitiesType.findUnique({
      where: { id },
    });
    return facilitiesType;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterFacilitiesTypes = async (
  query: string,
  facilitiesTypeCode: string,
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
    facilitiesTypeCode &&
      search.push({
        code: {
          contains: facilitiesTypeCode,
          mode: "insensitive",
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
        },
      });
    const facilitiesTypes = await db.facilitiesType.findMany({
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
    return facilitiesTypes;
  } catch (e) {
    console.error(e);
  }
};
export const getFacilitiesTypeByFields = async (fields: {
  name: string;
  description?: string;
  code?: string;
}) => {
  try {
    const facilitiesType = await db.facilitiesType.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: fields,
    });
    return facilitiesType;
  } catch (e) {
    console.error(e);
  }
};

export const getCountFacilitiestypes = async (
  query: string,
  facilitiesTypeCode: string,
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
    facilitiesTypeCode &&
      search.push({
        code: {
          contains: facilitiesTypeCode,
          mode: "insensitive",
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
        },
      });
    const count = await db.facilitiesType.count({
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
export const createFacilitiesType = async (fields: FACILITIESTYPE) => {
  try {
    const facilitiesType = await db.facilitiesType.create({ data: fields });
    return facilitiesType;
  } catch (e) {
    console.error(e);
  }
};

export const deleteFacilitiesType = async (id: string) => {
  try {
    const facilitiesType = await db.facilitiesType.delete({ where: { id } });
    return facilitiesType;
  } catch (e) {
    console.error(e);
  }
};
export const updateFacilitiesType = async (
  id: string,
  fields: {
    name: string;
    description: string;
  },
) => {
  try {
    const facilitiesType = await db.facilitiesType.update({
      where: { id },
      data: fields,
    });
    return facilitiesType;
  } catch (e) {
    console.error(e);
  }
};
