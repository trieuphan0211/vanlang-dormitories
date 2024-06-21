import { db } from "@/lib/db";

export const getStudentByEmail = async (email: string) => {
  try {
    const student = await db.student.findFirst({
      where: {
        AND: {
          email: {
            contains: email,
            mode: "insensitive",
          },
        },

        studentVerified: true,
      },
      include: {
        Room: {
          include: {
            Branch: true,
          },
        },
        Violate: true,
      },
    });

    return student;
  } catch (e) {
    console.error(e);
  }
};
export const getStudentsByEmail = async (email: string) => {
  try {
    const student = await db.student.findMany({
      where: {
        AND: {
          email: {
            contains: email,
            mode: "insensitive",
          },
        },

        studentVerified: true,
      },
      include: {
        Room: {
          include: {
            Branch: true,
          },
        },
      },
    });

    return student;
  } catch (e) {
    console.error(e);
  }
};
export const getAllStudents = async () => {
  try {
    const students = await db.student.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        studentVerified: true,
      },
    });
    return students;
  } catch (e) {
    console.error(e);
  }
};
export const getStudentById = async (id: string) => {
  try {
    console.log("id: ", { id, studentVerified: true });
    const student = await db.student.findUnique({
      where: { id, studentVerified: true },
    });
    return student;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterStudents = async (
  query: string,
  studentCode: string,
  email: string,
  gender: string,
  major: string,
  schoolYear: number,
  currentPage: number,
  entries: number,
) => {
  try {
    const search = [];
    query &&
      search.push({
        fullName: {
          contains: query,
          mode: "insensitive",
        },
      });
    studentCode &&
      search.push({
        studentCode: {
          contains: studentCode,
          mode: "insensitive",
        },
      });
    email &&
      search.push({
        email: {
          contains: email,
          mode: "insensitive",
        },
      });
    gender &&
      search.push({
        gender: {
          contains: gender,
          mode: "insensitive",
        },
      });
    major &&
      search.push({
        major: {
          contains: major,
          mode: "insensitive",
        },
      });
    schoolYear &&
      search.push({
        schoolYear: {
          equals: schoolYear,
        },
      });
    const students = await db.student.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
        studentVerified: true,
      },
      include: {
        Room: {
          include: {
            Branch: true,
          },
        },
      },

      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return students;
  } catch (e) {
    console.error(e);
  }
};

export const getCountStudents = async (
  query?: string,
  studentCode?: string,
  email?: string,
  gender?: string,
  major?: string,
  schoolYear?: number,
) => {
  try {
    const search = [];
    query &&
      search.push({
        fullName: {
          contains: query,
          mode: "insensitive",
        },
      });
    studentCode &&
      search.push({
        studentCode: {
          contains: studentCode,
          mode: "insensitive",
        },
      });
    email &&
      search.push({
        email: {
          contains: email,
          mode: "insensitive",
        },
      });
    gender &&
      search.push({
        gender: {
          contains: gender,
          mode: "insensitive",
        },
      });
    major &&
      search.push({
        major: {
          contains: major,
          mode: "insensitive",
        },
      });
    schoolYear &&
      search.push({
        schoolYear: {
          equals: schoolYear,
        },
      });
    const count = await db.student.count({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
        studentVerified: true,
      },
    });
    return count;
  } catch (e) {
    console.error(e);
  }
};
export const deleteStudent = async (id: string) => {
  try {
    console.log("id: ", id);
    const student = await db.student.delete({
      where: { id, studentVerified: true },
    });
    return student;
  } catch (e) {
    console.error(e);
  }
};
export const updateStudentInRoom = async (id: string, roomId?: string) => {
  try {
    const student = await db.student.update({
      where: { id },
      data: {
        roomId: roomId ? roomId : null,
      },
    });
    return student;
  } catch (e) {
    console.error(e);
  }
};
export const updateStudentPoint = async (id: string, point: number) => {
  try {
    const student = await db.student.update({
      where: { id },
      data: {
        point,
      },
    });
    return student;
  } catch (e) {
    console.error(e);
  }
};
export const updateStudent = async (
  email: string,
  fields: {
    bankAccount: string;
    bankBranch: string;
    bankName: string;
    bankNumber: string;
    brithday: string;
    cccdCode: string;
    cccdOfDate: string;
    cccdPlace: string;
    fullName: string;
    gender: string;
    major: string;
    nation: string;
    phone: number;
    religion: string;
    schoolYear: number;
    studentCode: string;
    createDate: Date;
    permanentResidence: string;
    contactinfo: string;
    familiInfo: string;
  },
) => {
  try {
    const student = await db.student.update({
      where: { email },
      data: fields,
    });
    return student;
  } catch (e) {
    console.error(e);
  }
};

export const resetPointOfStudents = async () => {
  // const students = await getAllStudents();
  const res = db.student.updateMany({
    data: {
      point: 10,
    },
  });
  return res;
};
export const removeRoomOfStudentExpired = async () => {
  try {
    const students = await db.student.updateMany({
      where: {
        AND: {
          Room: {
            allowRegisterDate: {
              lte: new Date(),
            },
          },
        },
      },
      data: {
        roomId: null,
      },
    });

    return students;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
