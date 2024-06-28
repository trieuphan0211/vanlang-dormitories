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
      include: { Facilities: true, Branch: true, Room: true },
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
          updateDate: "desc",
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
            reason: {
              contains: query,
            },
          },
        ],
      },
      include: {
        Branch: true,
        Facilities: true,
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
          updateDate: "desc",
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
            reason: {
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
  branchId: string;
  reason?: string;
  roomId?: string;
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
    reason?: string;
    status: StatusMaintenance;
    branchId: string;
    roomId?: string;
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

export const getMaintainanceByDateBranch = async ({
  branchId,
  startDate,
  finishDate,
}: {
  branchId?: string;
  startDate?: string;
  finishDate?: string;
}) => {
  try {
    const search = [];
    branchId &&
      search.push({
        branchId: {
          contains: branchId,
        },
      });

    if (startDate && finishDate) {
      search.push({
        updateDate: {
          gte: new Date(startDate),
          lte: new Date(finishDate),
        },
      });
    }
    if (startDate && !finishDate) {
      search.push({
        updateDate: {
          gte: new Date(startDate),
        },
      });
    }
    if (!startDate && finishDate) {
      search.push({
        updateDate: {
          lte: new Date(finishDate),
        },
      });
    }
    const maintenances = await db.maintenance.findMany({
      where: {
        AND: search as Array<any>,
      },
      include: {
        Facilities: {
          include: {
            FacilitiesType: true,
          },
        },
      },
    });
    return maintenances;
  } catch (e) {
    console.error(e);
  }
};
