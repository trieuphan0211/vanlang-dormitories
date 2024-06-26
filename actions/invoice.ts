"use server";

import {
  changeStatusInvoice,
  createInvoices,
  deleteInvoice,
  getAllInvoiceForDashboard,
  getInvoicesExpired,
  getIvoiceById,
} from "@/data/invoice";
import { getRoomById } from "@/data/room";
import { getStudentById } from "@/data/student";
import { sendInvoiceEmail } from "@/lib/mail";
import { InvoceSchema } from "@/schema";
import { BRANCH, INVOICE, ROOM, STUDENT } from "@/types";
import { Invoice } from "@prisma/client";
import * as z from "zod";
import { changeStatusViolateById } from "./violate";

interface Invoices {
  invoiceMonth: number;
  invoiceYear: number;
  total: number;
  status: number;
}
export const resendMail = async () => {
  try {
    const invoices = (await getInvoicesExpired()) as INVOICE[];
    await Promise.all(
      invoices.map(async (invoice) => {
        invoice?.violateId
          ? sendInvoiceEmail({
              student: invoice.Student as STUDENT,
              detail: JSON.parse(invoice.detail).detail,
            })
          : sendInvoiceEmail({
              roomDetail: invoice.Room,
              student: invoice.Student as STUDENT,
              detail: JSON.parse(invoice.detail).detail,
              month:
                invoice.invoiceMonth + "/" + invoice.invoiceYear + " lần 2",
            });
      }),
    );
    return { success: "success" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const createInvoice = async (data: z.infer<typeof InvoceSchema>) => {
  try {
    const validateValue = InvoceSchema.safeParse(data);
    if (!validateValue.success) {
      return { error: "Invalid Values!" };
    }
    const { invoiceMonth, invoiceYear, detail } = validateValue.data;
    const sendMail = detail.map(async (room, index) => {
      // Get room detail
      const roomDetail = (await getRoomById(room.roomId)) as ROOM;
      // Get service detail and calculate cost
      const service = roomDetail?.Services?.map((service) => {
        return {
          serviceId: service.Service.id,
          serviceName: service.Service.name,
          quantity:
            Number(
              room.service.find((e: any) => e.serviceId === service.Service.id)
                ?.quantity as string,
            ) || 1,
          unit:
            service.Service.cost.toLocaleString("en-US") +
            "/" +
            service.Service.unit,
          cost: service.Service.allow
            ? service.Service.cost *
              Number(
                room.service.find(
                  (e: any) => e.serviceId === service.Service.id,
                )?.quantity as string,
              )
            : service.Service.cost,
        };
      }) as Array<{
        serviceId: string;
        quantity: number;
        unit: string;
        serviceName: string;
        cost: number;
      }>;
      // Add room cost to service
      service.push({
        serviceId: room.roomId,
        quantity: 1,
        unit: roomDetail?.RoomType?.cost.toLocaleString("en-US") + "/tháng",
        serviceName: "Tiền Phòng",
        cost: roomDetail?.RoomType?.cost as number,
      });
      // Send mail to all student
      return await Promise.all(
        // map student in room
        roomDetail?.Student?.map(async (student): Promise<any> => {
          // Send mail to student
          const res = await sendInvoiceEmail({
            roomDetail,
            student,
            detail: service,
            month: invoiceMonth + "/" + invoiceYear,
          });
          if (res) {
            // Create object invoice
            const dataInvoice = {
              roomId: room.roomId,
              invoiceMonth: Number(invoiceMonth),
              invoiceYear: Number(invoiceYear),
              total: service.reduce(
                (total: number, item: any) => total + item.cost,
                0,
              ),
              studentId: student.id,
              detail: JSON.stringify({
                name: roomDetail?.code + "-" + roomDetail?.RoomType?.name,
                detail: service,
              }),
              status: 0,
            };
            console.log("dataInvoice: ", dataInvoice);
            // Add invoice to database
            return await createInvoices(dataInvoice);
          }
        }) as Promise<any>[],
      );
    });
    try {
      console.log("Invoce: Send mail to student");
      await Promise.all(sendMail);
      console.log("Invoice: Send mail to student done");

      return { success: "success" };
    } catch (error) {
      console.error("Error sending emails1: ", error);
      return { error: "An error occurred!" };
    }
  } catch (e) {
    console.error(e);
  }
};
export const createInvoiceForViolate = async ({
  studentId,
  violateId,
  items,
}: {
  studentId: string;
  violateId: string;
  items: string;
}) => {
  // Convert items to array of service
  const service = JSON.parse(items).map((item: any) => {
    return {
      serviceId: "",
      quantity: 1,
      unit: "",
      serviceName: item.name,
      cost: item.cost,
    };
  }) as Array<{
    serviceId: string;
    quantity: number;
    unit: string;
    serviceName: string;
    cost: number;
  }>;
  const student = (await getStudentById(studentId)) as STUDENT;
  if (!student) {
    return { error: "Student not found!" };
  }
  // Send mail to student

  const sendMail = await sendInvoiceEmail({
    student,
    detail: service,
  });
  if (sendMail) {
    const invoice = await createInvoices({
      invoiceMonth: new Date().getMonth(),
      invoiceYear: new Date().getFullYear(),
      total: service.reduce((total: number, item: any) => total + item.cost, 0),
      studentId: student.id,
      detail: JSON.stringify({
        name: "Phạt vi phạm",
        detail: service,
      }),
      violateId: violateId,
      status: 0,
    });
    return invoice;
  }
};
export const removeInvoice = async (id: string) => {
  try {
    await deleteInvoice(id);
    console.log("Invoice is removed!");
    return { success: "Invoice is removed!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const changeStatusInvoiceById = async (id: string) => {
  try {
    const invoice = (await getIvoiceById(id)) as Invoice;
    if (invoice.violateId) {
      await changeStatusViolateById(invoice.violateId);
    }
    const response = await changeStatusInvoice(id);
    if (!response) {
      return { error: "An error occurred!" };
    }
    console.log("Invoice is changed!");
    return { success: "Invoice is changed!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const getInvoiceForDashboard = async (
  branchId?: string,
  startDate?: string,
  finishDate?: string,
) => {
  const year = [] as number[];

  const invoices = (await getAllInvoiceForDashboard({
    branchId,
    startDate,
    finishDate,
  })) as Invoices[];
  invoices.map((invoice) => {
    if (!year.includes(invoice.invoiceYear)) {
      year.push(invoice.invoiceYear);
    }
  });
  const result = year.map((year) => {
    const invoicesArr = Array.from({ length: 12 }).map(() => 0);
    invoices
      .filter((invoice) => invoice.invoiceYear === year)
      .map((invoice) => {
        invoicesArr[Number(invoice.invoiceMonth) - 1] =
          (invoicesArr[Number(invoice.invoiceMonth) - 1] || 0) + invoice.total;
      });
    return {
      year,
      invoicesArr,
    };
  });

  return result;
};

export const getInvoiceForDashboard1 = async (
  branchId?: string,
  startDate?: string,
  finishDate?: string,
) => {
  const year = [] as number[];

  const invoices = (await getAllInvoiceForDashboard({
    branchId,
    startDate: "2024-01-01T00:00:00.000Z",
    finishDate: "2024-11-31T23:59:59.999Z",
  })) as Invoices[];
  invoices.map((invoice) => {
    if (!year.includes(invoice.invoiceYear)) {
      year.push(invoice.invoiceYear);
    }
  });
  const result = year.map((year) => {
    const invoicesArr = Array.from({ length: 12 }).map(() => 0);

    invoices
      .filter((invoice) => invoice.invoiceYear === year)
      .map((invoice) => {
        invoicesArr[Number(invoice.invoiceMonth) - 1] =
          (invoicesArr[Number(invoice.invoiceMonth) - 1] || 0) + invoice.total;
      });
    const invoiceNotPaid = Array.from({ length: 12 }).map(() => 0);
    invoices
      .filter((invoice) => invoice.invoiceYear === year && invoice.status === 0)
      .map((invoice) => {
        invoiceNotPaid[Number(invoice.invoiceMonth) - 1] =
          (invoiceNotPaid[Number(invoice.invoiceMonth) - 1] || 0) +
          invoice.total;
      });

    return {
      year,
      invoicesArr,
      invoiceNotPaid,
    };
  });

  return result;
};

export const getInvoiceStatus = async () => {
  const invoices = (await getAllInvoiceForDashboard({
    // branchId,
    startDate: "2024-01-01T00:00:00.000Z",
    finishDate: "2024-11-31T23:59:59.999Z",
  })) as Invoices[];
  return {
    paid: invoices.filter((invoice) => invoice.status === 1).length,
    notPaid: invoices.filter((invoice) => invoice.status === 0).length,
  };
};
