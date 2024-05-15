import { db } from "@/lib/db";
interface Invoice {
  roomId: string;
  invoiceDate: string;
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
    const branch = await db.invoice.create({ data });
    return branch;
  } catch (e) {
    console.error(e);
  }
};
export const getFilterInvoices = async (
  query: string,
  roomCode: string,
  branchName: string,
  status: number,
  currentPage: number,
  entries: number,
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
