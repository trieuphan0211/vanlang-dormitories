import { db } from "@/lib/db";

interface VIOLATE {
  name: string;
  studentId: string;
  description: string;
}
export const getViolateAll = async () => {
  try {
    const violate = await db.violate.findMany();
    return violate;
  } catch (e) {
    console.error(e);
  }
};

export const getViolateById = async (id: string) => {
  try {
    const violate = await db.violate.findUnique({ where: { id } });
    return violate;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterViolate = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const violate = await db.violate.findMany({
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
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        Student: true,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return violate;
  } catch (e) {
    console.error(e);
  }
};
export const getViolateByFields = async (fields: {
  name: string;
  description?: string;
}) => {
  try {
    const violate = await db.violate.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: fields,
    });
    return violate;
  } catch (e) {
    console.error(e);
  }
};
export const getCountViolate = async (query: string) => {
  try {
    const count = await db.violate.count({
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
export const createViolate = async (fields: VIOLATE) => {
  try {
    const violate = await db.violate.create({ data: fields });
    return violate;
  } catch (e) {
    console.error(e);
  }
};
export const deleteViolate = async (id: string) => {
  try {
    const violate = await db.violate.delete({ where: { id } });
    return violate;
  } catch (e) {
    console.error(e);
  }
};

export const updateViolate = async (
  id: string,
  fields: {
    name: string;
    studentId: string;
    description: string;
  },
) => {
  try {
    const violate = await db.violate.update({ where: { id }, data: fields });
    return violate;
  } catch (e) {
    console.error(e);
  }
};
