import { db } from "@/lib/db";
import { equal } from "assert";

interface Services {
  name: string;
  description?: string;
  cost: number;
}

export const getServiceById = async (id: string) => {
  try {
    const service = await db.services.findUnique({ where: { id } });
    return service;
  } catch (e) {
    console.error(e);
  }
};

export const getFilterServices = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const services = await db.services.findMany({
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
            cost: {
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
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return services;
  } catch (e) {
    console.error(e);
  }
};
export const getServicesByFields = async (fields: {
  name: string;
  cost?: number;
  description?: string;
}) => {
  try {
    const services = await db.services.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: fields,
    });
    return services;
  } catch (e) {
    console.error(e);
  }
};
export const getCountServices = async (query: string) => {
  try {
    const count = await db.services.count({
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
            cost: {
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
export const createService = async (fields: Services) => {
  try {
    const service = await db.services.create({ data: fields });
    return service;
  } catch (e) {
    console.error(e);
  }
};
export const deleteService = async (id: string) => {
  try {
    const service = await db.services.delete({ where: { id } });
    return service;
  } catch (e) {
    console.error(e);
  }
};
export const updateService = async (id: string, fields: Services) => {
  try {
    const services = await db.services.update({ where: { id }, data: fields });
    return services;
  } catch (e) {
    console.error(e);
  }
};
