import { db } from "@/lib/db";

export const getStudentByEmail = async (email: string) => {
  try {
    const student = await db.student.findUnique({ where: { email } });

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
          createDate: "desc",
        },
      ],
    });
    return students;
  } catch (e) {
    console.error(e);
  }
};
export const getStudentById = async (id: string) => {
  try {
    const student = await db.student.findUnique({ where: { id } });
    return student;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterStudents = async (
  query: string,
  currentPage: number,
  entries: number,
) => {
  try {
    const students = await db.student.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            fullName: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            major: {
              contains: query,
            },
          },
          {
            schoolYear: {
              equals: Number(query),
            },
          },

          {
            gender: {
              contains: query,
            },
          },
          {
            address: {
              contains: query,
            },
          },
          {
            phone: {
              contains: query,
            },
          },
        ],
      },

      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return students;
  } catch (e) {
    console.error(e);
  }
};

export const getCountStudents = async (query: string) => {
  try {
    const count = await db.student.count({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            fullName: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            major: {
              contains: query,
            },
          },
          {
            schoolYear: {
              equals: Number(query),
            },
          },

          {
            gender: {
              contains: query,
            },
          },
          {
            address: {
              contains: query,
            },
          },
          {
            phone: {
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
export const deleteStudent = async (id: string) => {
  try {
    console.log("id: ", id);
    const student = await db.student.delete({ where: { id } });
    return student;
  } catch (e) {
    console.error(e);
  }
};
export const updateStudent = async (
  id: string,
  fields: {
    fullName: string;
    major: string;
    schoolYear: number;
    brithday: Date;
    gender: string;
    address: string;
    phone: string;
  },
) => {
  try {
    const student = await db.student.update({
      where: { id },
      data: fields,
    });
    return student;
  } catch (e) {
    console.error(e);
  }
};
