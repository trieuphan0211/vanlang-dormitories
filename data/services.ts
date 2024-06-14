import { db } from "@/lib/db";

interface Services {
  name: string;
  description?: string;
  cost: number;
  unit: string;
  allow: boolean;
}

export const getServicesAll = async () => {
  try {
    const services = await db.services.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
    });
    return services;
  } catch (e) {
    console.error(e);
  }
};

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
  cost: number,
  unit: string,
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
    cost &&
      search.push({
        cost: {
          equals: cost,
        },
      });
    unit &&
      search.push({
        unit: {
          contains: unit,
          mode: "insensitive",
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
          mode: "insensitive",
        },
      });
    const services = await db.services.findMany({
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
          updateDate: "desc",
        },
      ],
      where: fields,
    });
    return services;
  } catch (e) {
    console.error(e);
  }
};
export const getCountServices = async (
  query: string,
  cost: number,
  unit: string,
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
    cost &&
      search.push({
        cost: {
          equals: cost,
        },
      });
    unit &&
      search.push({
        unit: {
          contains: unit,
          mode: "insensitive",
        },
      });
    description &&
      search.push({
        description: {
          contains: description,
          mode: "insensitive",
        },
      });
    const count = await db.services.count({
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
