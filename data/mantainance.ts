import { db } from "@/lib/db";
import { StatusMaintenance } from "@prisma/client";
interface MAINTENANCE {
  code: string;
  mantainanceName: string;
  description?: string;
  startDate: Date;
  status: StatusMaintenance;
}
export const getMaintenancesById = async (id: string) => {
  try {
    const maintenances = await db.maintenance.findUnique({
      where: { id: id },
      include: { facilities: true },
    });
    return maintenances;
  } catch (e) {
    console.error(e);
  }
};

export const getFilterMaintenances = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const maintenances = await db.maintenance.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
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
        ],
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return maintenances;
  } catch (e) {
    console.error(e);
  }
};
export const getCountMaintenances = async (query: string) => {
  try {
    const count = await db.maintenance.count({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
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
        ],
      },
    });
    return count;
  } catch (e) {
    console.error(e);
  }
};

export const createMaintenance = async (fields: {
  code: string;
  mantainanceName: string;
  description?: string;
  startDate: Date;
  status: StatusMaintenance;
}) => {
  try {
    const maintenance = await db.maintenance.create({
      data: fields,
    });
    return maintenance;
  } catch (e) {
    console.error(e);
  }
};

export const deleteMaintenance = async (id: string) => {
  try {
    const maintenance = await db.maintenance.delete({
      where: {
        id,
      },
    });
    return maintenance;
  } catch (e) {
    console.error(e);
  }
};

export const updateMaintenance = async (
  id: string,
  fields: {
    mantainanceName: string;
    description?: string;
    status: StatusMaintenance;
  },
) => {
  try {
    const maintenance = await db.maintenance.update({
      where: {
        id,
      },
      data: fields,
    });
    return maintenance;
  } catch (e) {
    console.error(e);
  }
};
