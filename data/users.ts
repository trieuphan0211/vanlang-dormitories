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
  role: string,
  email: string,
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
    role &&
      search.push({
        role: role as UserRole,
      });
    email &&
      search.push({
        email: {
          contains: email,
          mode: "insensitive",
        },
      });
    const users = await db.user.findMany({
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
        signinTime: true,
      },
      where: {
        AND: search as Array<any>,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return users;
  } catch (e) {
    console.error(e);
  }
};
export const getCountUsers = async (
  query: string,
  role: string,
  email: string,
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
    role &&
      search.push({
        role: role as UserRole,
      });
    email &&
      search.push({
        email: {
          contains: email,
          mode: "insensitive",
        },
      });
    const count = await db.user.count({
      orderBy: [
        {
          emailVerified: "desc",
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
    name?: string;
    role?: UserRole;
    verifiedInfo?: boolean;
  },
) => {
  try {
    const currentUser = await db.user.findUnique({ where: { id } });
    if (!currentUser) {
      return "User not found";
    }
    const student = await db.student.findUnique({
      where: { email: currentUser.email as string },
    });
    if (!student) {
      return "Student not found";
    }
    if (fields.role) {
      if (
        fields.role === "ADMIN" ||
        fields.role === "DIRECTOR" ||
        fields.role === "STAFF"
      ) {
        await db.student.update({
          where: {
            id: student.id,
          },
          data: {
            studentVerified: false,
          },
        });
      }
      if (fields.role === "USER") {
        await db.student.update({
          where: {
            id: student.id,
          },
          data: {
            studentVerified: true,
          },
        });
      }
    }
    const user = await db.user.update({
      where: { id },
      data: fields,
    });
    return user;
  } catch (e) {
    console.error(e);
  }
};
