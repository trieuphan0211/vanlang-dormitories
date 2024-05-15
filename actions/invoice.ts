"use server";

import {
  changeStatusInvoice,
  createInvoices,
  deleteInvoice,
} from "@/data/invoice";
import { getRoomById } from "@/data/room";
import { sendInvoiceEmail } from "@/lib/mail";
import { InvoceSchema } from "@/schema";
import { ROOM } from "@/types";
import * as z from "zod";

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
          serviceId: service.service.id,
          serviceName: service.service.name,
          cost: service.service.allow
            ? service.service.cost *
              Number(
                room.service.find(
                  (e: any) => e.serviceId === service.service.id,
                )?.quantity as string,
              )
            : service.service.cost,
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
        cost: roomDetail?.roomType?.cost as number,
      });
      // Send mail to all student
      return await Promise.all(
        // map student in room
        roomDetail?.Student?.map(async (student): Promise<any> => {
          // Send mail to student
          const res = await sendInvoiceEmail(student.email, student.fullName, {
            name: roomDetail?.code + "-" + roomDetail?.roomType?.name,
            detail: service,
          });
          if (res) {
            // Create object invoice
            const dataInvoice = {
              roomId: room.roomId,
              invoiceDate: invoiceMonth + "/" + invoiceYear,
              total: service.reduce(
                (total: number, item: any) => total + item.cost,
                0,
              ),
              studentId: student.id,
              detail: JSON.stringify({
                name: roomDetail?.code + "-" + roomDetail?.roomType?.name,
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
    // const responses = await room.map(async (room) => {
    //   let mailBody: {
    //     name: string;
    //     detail: Array<{
    //       serviceName: string;
    //       serviceId?: string;
    //       cost: number;
    //     }>;
    //   } = {
    //     name: "",
    //     detail: [],
    //   };
    //   const roomDetail = await getRoomById(room.roomId);
    //   mailBody.name = roomDetail?.code + "-" + roomDetail?.roomType.name;
    //   mailBody.detail.push({
    //     serviceName: "Tiền Phòng",
    //     cost: roomDetail?.roomType.cost as number,
    //   });
    //   room.detail.map((detail: any, index: number) => {
    //     const service = roomDetail?.Services.filter(
    //       (e) => e.serviceId === detail.serviceId,
    //     );
    //     service?.map((service) => {
    //       mailBody.detail.push({
    //         serviceName: service.service.name as string,
    //         serviceId: service.service.id,
    //         cost: service.service.cost * Number(detail.cost),
    //       });
    //     });
    //     const serviceStatis = roomDetail?.Services.filter(
    //       (e) => !e.service.allow,
    //     );
    //     serviceStatis?.map((service) => {
    //       mailBody.detail.push({
    //         serviceName: service.service.name as string,
    //         serviceId: service.service.id,
    //         cost: service.service.cost,
    //       });
    //     });
    //   });

    //   const res = roomDetail?.Student.map(async (student) => {
    //     return await sendInvoiceEmail(
    //       student.email,
    //       student.fullName,
    //       mailBody,
    //     );
    //   });
    //   if (res) {
    //     const dataInvoice = {
    //       roomId: room.roomId,
    //       invoiceDate:
    //         data?.invoiceDate + "/" + new Date().getFullYear().toString(),
    //       total: mailBody?.detail?.reduce(
    //         (total: number, item: any) => total + item.cost,
    //         0,
    //       ),
    //       detail: JSON.stringify(mailBody),
    //       status: 0,
    //     };
    //     const addInvoices = await createInvoices(dataInvoice);
    //     if (addInvoices) {
    //       return addInvoices;
    //     }
    //   }
    // });
    // if (response) {
    //   return { success: "success" };
    // }
    // return { error: "error" };
  } catch (e) {
    console.error(e);
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
