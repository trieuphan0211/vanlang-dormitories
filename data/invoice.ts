import { db } from "@/lib/db";
interface Invoice {
  roomId: string;
  invoiceDate: string;
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
  currentPage: number,
  entries: number,
) => {
  try {
    const invoices = await db.invoice.findMany({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            total: {
              equals: Number(query),
            },
          },
          {
            room: {
              OR: [
                {
                  code: {
                    contains: query,
                  },
                },
                {
                  branch: {
                    OR: [
                      {
                        name: {
                          contains: query,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      include: {
        room: {
          include: {
            branch: true,
          },
        },
      },
      skip: (currentPage - 1) * entries,
      take: entries,
    });
    return invoices;
  } catch (e) {
    console.error(e);
  }
};
export const getCountInvoices = async (query: string) => {
  try {
    const count = await db.invoice.count({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        OR: [
          {
            total: {
              equals: Number(query),
            },
          },
          {
            room: {
              OR: [
                {
                  code: {
                    contains: query,
                  },
                },
                {
                  branch: {
                    OR: [
                      {
                        name: {
                          contains: query,
                        },
                      },
                    ],
                  },
                },
              ],
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
