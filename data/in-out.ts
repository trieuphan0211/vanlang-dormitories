import { db } from "@/lib/db";
import { StatusInOut } from "@prisma/client";

export const getFilterInOut = async (
  query: string,
  status: StatusInOut,
  studentCode: string,
  currentPage: number,
  entries: number,
  studentId?: string,
) => {
  try {
    const search = [];
    query &&
      search.push({
        Student: {
          fullName: {
            contains: query,
            mode: "insensitive",
          },
        },
      });
    studentId &&
      search.push({
        studentId: {
          equals: studentId,
        },
      });
    studentCode &&
      search.push({
        Student: {
          studentCode: {
            contains: studentCode,
            mode: "insensitive",
          },
        },
      });
    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    const branchs = await db.inOut.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
      },
      include: {
        Student: true,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return branchs;
  } catch (e) {
    console.error(e);
  }
};
export const getCountInOut = async (
  query: string,
  status: StatusInOut,
  studentCode: string,
  studentId?: string,
) => {
  try {
    const search = [];
    query &&
      search.push({
        Student: {
          fullName: {
            contains: query,
            mode: "insensitive",
          },
        },
      });
    studentId &&
      search.push({
        studentId: {
          equals: studentId,
        },
      });
    studentCode &&
      search.push({
        Student: {
          studentCode: {
            contains: studentCode,
            mode: "insensitive",
          },
        },
      });
    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    const count = await db.inOut.count({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: [...search] as Array<any>,
      },
    });
    return count;
  } catch (e) {
    console.error(e);
  }
};

export const createInOut = async (data: {
  studentId: string;
  status: StatusInOut;
}) => {
  try {
    const inOut = await db.inOut.create({ data });
    return inOut;
  } catch (error) {
    console.error(error);
  }
};
