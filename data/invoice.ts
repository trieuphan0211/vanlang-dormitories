import { db } from "@/lib/db";
interface Invoice {
  roomId: string;
  invoiceMonth: string;
  invoiceYear: string;
  studentId: string;
  total: number;
  detail: string;
  status: number;
}

export const getIvoiceById = async (id: string) => {
  try {
    const invoice = await db.invoice.findUnique({
      where: {
        id,
      },
      include: {
        room: {
          include: {
            branch: true,
            roomType: true,
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
          createDate: "desc",
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
          createDate: "desc",
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
        room: {
          include: {
            branch: true,
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
          createDate: "desc",
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
