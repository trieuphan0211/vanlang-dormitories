import { db } from "@/lib/db";

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
