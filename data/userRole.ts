import { db } from "@/lib/db";

export const getUserRoleByName = async (name: string) => {
  try {
    const userRole = await db.userRole.findUnique({ where: { name } });

    return userRole;
  } catch (e) {
    console.error(e);
  }
};
export const getUserRoleById = async (id: string) => {
  try {
    const userRole = await db.userRole.findUnique({ where: { id } });

    return userRole;
  } catch (error) {
    console.error(error);
  }
};
