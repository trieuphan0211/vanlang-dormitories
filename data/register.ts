import { db } from "@/lib/db";
import { equal } from "assert";

export const getRegisterById = async (id: string) => {
  try {
    const register = await db.register.findUnique({
      where: {
        id,
      },
      include: {
        Student: true,
        Room: {
          include: {
            Branch: true,
          },
        },
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
          updateDate: "desc",
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
  roomCode: string,
  branchName: string,
  year: number,
  status: number,
  date: string,
  currentPage: number,
  entries: number,
  email?: string,
) => {
  try {
    const search = [];
    query &&
      search.push({
        student: {
          fullName: {
            contains: query,
            mode: "insensitive",
          },
        },
      });
    roomCode &&
      search.push({
        room: {
          code: {
            contains: roomCode,
            mode: "insensitive",
          },
        },
      });
    branchName &&
      search.push({
        room: {
          branch: {
            name: {
              contains: branchName,
              mode: "insensitive",
            },
          },
        },
      });
    year &&
      search.push({
        registerdeadline: {
          equals: year,
        },
      });
    status == 0 &&
      search.push({
        status: {
          equals: status,
        },
      });

    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    date &&
      search.push({
        createDate: {
          gte: new Date(date),
        },
      });
    email && search.push({ studentEmail: email });
    console.log(search);
    const register = await db.register.findMany({
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
        Room: {
          include: {
            Branch: true,
          },
        },
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
export const getCountRegister = async (
  query: string,
  roomCode: string,
  branchName: string,
  year: number,
  // date: string,
  email?: string,
) => {
  try {
    const search = [];
    query &&
      search.push({
        student: {
          fullName: {
            contains: query,
            mode: "insensitive",
          },
        },
      });
    roomCode &&
      search.push({
        room: {
          code: {
            contains: roomCode,
            mode: "insensitive",
          },
        },
      });
    branchName &&
      search.push({
        room: {
          branch: {
            name: {
              contains: branchName,
              mode: "insensitive",
            },
          },
        },
      });
    year &&
      search.push({
        registerdeadline: {
          equals: year,
        },
      });
    email && search.push({ studentEmail: email });
    const register = await db.register.count({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
      },
    });
    return register;
  } catch (e) {
    console.error(e);
  }
};
export const createRegisterById = async (data: {
  roomId: string;
  registerdeadline: number;
  studentEmail: string;
  status?: number;
}) => {
  try {
    const register = await db.register.create({
      data: {
        status: 0,
        ...data,
      },
    });
    console.log(register);
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
