import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (e) {
    console.error(e);
  }
};
export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: [
        {
          emailVerified: "desc",
        },
      ],
      select: {
        id: true,
        email: true,
        role: true,
        image: true,
      },
    });
    return users;
  } catch (e) {
    console.error(e);
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterUsers = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const services = await db.user.findMany({
      orderBy: [
        {
          emailVerified: "desc",
        },
      ],
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
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

export const getCountUsers = async (query: string) => {
  try {
    const count = await db.user.count({
      orderBy: [
        {
          emailVerified: "desc",
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
            email: {
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
export const deleteUser = async (id: string) => {
  try {
    console.log("id: ", id);
    const user = await db.user.delete({ where: { id } });
    return user;
  } catch (e) {
    console.error(e);
  }
};
export const updateUser = async (
  id: string,
  fields: {
    name: string;
    role: UserRole;
  },
) => {
  try {
    const facilitiesType = await db.user.update({
      where: { id },
      data: fields,
    });
    return facilitiesType;
  } catch (e) {
    console.error(e);
  }
};
