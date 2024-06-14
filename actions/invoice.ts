"use server";

import {
  changeStatusInvoice,
  createInvoices,
  deleteInvoice,
  getAllInvoiceForDashboard,
  getIvoiceById,
} from "@/data/invoice";
import { getRoomById } from "@/data/room";
import { getStudentById } from "@/data/student";
import { sendInvoiceEmail } from "@/lib/mail";
import { InvoceSchema } from "@/schema";
import { BRANCH, ROOM, STUDENT } from "@/types";
import { Invoice } from "@prisma/client";
import * as z from "zod";
import { changeStatusViolateById } from "./violate";

interface Invoices {
  invoiceMonth: string;
  invoiceYear: string;
  total: number;
  status: number;
}

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
        serviceName: string;
        cost: number;
      }>;
      // Add room cost to service
      service.push({
        serviceId: room.roomId,
        serviceName: "Tiền Phòng",
        cost: roomDetail?.RoomType?.cost as number,
      });
      // Send mail to all student
      return await Promise.all(
        // map student in room
        roomDetail?.Student?.map(async (student): Promise<any> => {
          // Send mail to student
          const res = await sendInvoiceEmail(student.email, student.fullName, {
            name: roomDetail?.code + "-" + roomDetail?.RoomType?.name,
            detail: service,
          });
          if (res) {
            // Create object invoice
            const dataInvoice = {
              roomId: room.roomId,
              invoiceMonth: invoiceMonth,
              invoiceYear: invoiceYear,
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
      serviceName: item.name,
      cost: item.cost,
    };
  }) as Array<{
    serviceId: string;
    serviceName: string;
    cost: number;
  }>;
  const student = (await getStudentById(studentId)) as STUDENT;
  if (!student) {
    return { error: "Student not found!" };
  }
  // Send mail to student

  const sendMail = await sendInvoiceEmail(student.email, student.fullName, {
    name: "Phạt vi phạm",
    detail: service,
  });
  if (sendMail) {
    const invoice = await createInvoices({
      invoiceMonth: new Date().getMonth().toString(),
      invoiceYear: new Date().getFullYear().toString(),
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
  invoiceYear?: string,
) => {
  const data = {
    total: Array.from({ length: 12 }).map(() => 0), // Initialize the array with length 12
    paid: Array.from({ length: 12 }).map(() => 0),
  };
  const invoices = (await getAllInvoiceForDashboard({
    branchId,
    invoiceYear,
  })) as Invoices[];
  invoices.map((invoice) => {
    console.log("invoice: ", invoice);
    data.total[Number(invoice.invoiceMonth) - 1] =
      (data.total[Number(invoice.invoiceMonth) - 1] || 0) + invoice.total;
    if (invoice.status === 1) {
      data.paid[Number(invoice.invoiceMonth) - 1] =
        (data.paid[Number(invoice.invoiceMonth) - 1] || 0) + invoice.total;
    }
  });
  return data;
};
