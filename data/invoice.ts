import { db } from "@/lib/db";
interface Invoice {
  roomId?: string;
  invoiceMonth: string;
  invoiceYear: string;
  studentId: string;
  total: number;
  detail: string;
  violateId?: string;
  status: number;
}

export const getIvoiceById = async (id: string) => {
  try {
    const invoice = await db.invoice.findUnique({
      where: {
        id,
      },
      include: {
        Room: {
          include: {
            Branch: true,
            RoomType: true,
          },
        },
        Violate: {
          include: {
            TypeViolate: true,
          },
        },
      },
    });
    return invoice;
  } catch (e) {
    console.error(e);
  }
};

export const createInvoices = async (data: Invoice) => {
  try {
    const invoice = await db.invoice.create({ data });
    return invoice;
  } catch (e) {
    console.error(e);
  }
};
export const getAllInvoiceForDashboard = async ({
  branchId,
  invoiceYear,
}: {
  branchId?: string;
  invoiceYear?: string;
}) => {
  try {
    const search = [];
    branchId &&
      search.push({
        room: {
          branch: {
            id: branchId,
          },
        },
      });
    invoiceYear &&
      search.push({
        invoiceYear: {
          contains: invoiceYear,
        },
      });
    const invoices = await db.invoice.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,
      },
      select: {
        invoiceMonth: true,
        invoiceYear: true,
        total: true,
        status: true,
      },
    });
    return invoices;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const getFilterInvoices = async (
  query: string,
  roomCode: string,
  branchName: string,
  status: number,
  currentPage: number,
  entries: number,
  startDate?: Date,
  endDate?: Date,
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

    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    const invoices = await db.invoice.findMany({
      orderBy: [
        {
          updateDate: "desc",
        },
      ],
      where: {
        AND: search as Array<any>,

        createDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        Room: {
          include: {
            Branch: true,
          },
        },
        Student: true,
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return invoices;
  } catch (e) {
    console.error(e);
  }
};
export const getCountInvoices = async (
  query: string,
  roomCode: string,
  branchName: string,
  status: number,
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
    status &&
      search.push({
        status: {
          equals: status,
        },
      });
    const count = await db.invoice.count({
      orderBy: [
        {
          updateDate: "desc",
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
export const getInvoicesExpired = async () => {
  try {
    const invoices = await db.invoice.findMany({
      where: {
        status: 0,
        createDate: {
          lte: new Date(new Date().setDate(new Date().getDate() - 5)),
        },
      },
      include: {
        Room: {
          include: {
            Branch: true,
            RoomType: true,
          },
        },
        Student: true,
      },
    });
    return invoices;
  } catch (e) {
    console.error(e);
  }
};
export const deleteInvoice = async (id: string) => {
  try {
    await db.invoice.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
export const changeStatusInvoice = async (id: string) => {
  try {
    const res = await db.invoice.update({
      where: {
        id,
      },
      data: {
        status: 1,
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};
