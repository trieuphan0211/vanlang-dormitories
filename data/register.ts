import { db } from "@/lib/db";

export const getRegisterById = async (id: string) => {
  try {
    const register = await db.register.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
      },
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
export const getAllRegister = async () => {
  try {
    const register = await db.register.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterRegister = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const register = await db.register.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            student: {
              OR: [
                {
                  fullName: {
                    contains: query,
                  },
                },
                {
                  studentCode: {
                    contains: query,
                  },
                },
                {
                  major: {
                    contains: query,
                  },
                },
              ],
            },
          },
        ],
      },
      include: {
        student: true,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
export const getCountRegister = async (query: string) => {
  try {
    const register = await db.register.count({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            student: {
              fullName: {
                contains: query,
              },
              studentCode: {
                contains: query,
              },
            },
          },
        ],
      },
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
export const updateRegister = async (id: string, data: any) => {
  try {
    const register = await db.register.update({
      where: {
        id,
      },
      data,
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
