"use server";

import {
  changeStatusInvoice,
  createInvoices,
  deleteInvoice,
} from "@/data/invoice";
import { getRoomById } from "@/data/room";
import { sendInvoiceEmail } from "@/lib/mail";

export const createInvoice = async (data: any) => {
  try {
    let room: Array<any> = [];
    const roomId = Object.keys(data.detail);
    const detail = Object.values(data.detail);
    roomId.map((id, index) => {
      let roomDetail: Array<{
        serviceId: string;
        cost: string;
      }> = [];
      const serviceId = Object.keys(detail[index] as object);
      const serviceCost = Object.values(detail[index] as object) as string[];
      serviceId.map((id, index) => {
        roomDetail.push({
          serviceId: id,
          cost: serviceCost[index],
        });
      });
      room.push({
        roomId: id,
        detail: roomDetail,
      });
    });
    const response = room.map(async (room) => {
      let mailBody: {
        name: string;
        detail: Array<{
          serviceName: string;
          serviceId?: string;
          cost: number;
        }>;
      } = {
        name: "",
        detail: [],
      };
      const roomDetail = await getRoomById(room.roomId);
      mailBody.name = roomDetail?.code + "-" + roomDetail?.roomType.name;
      mailBody.detail.push({
        serviceName: "Tiền Phòng",
        cost: roomDetail?.roomType.cost as number,
      });
      room.detail.map((detail: any, index: number) => {
        const service = roomDetail?.Services.filter(
          (e) => e.serviceId === detail.serviceId,
        );
        service?.map((service) => {
          mailBody.detail.push({
            serviceName: service.service.name as string,
            serviceId: service.service.id,
            cost: service.service.cost * Number(detail.cost),
          });
        });
        const serviceStatis = roomDetail?.Services.filter(
          (e) => !e.service.allow,
        );
        serviceStatis?.map((service) => {
          mailBody.detail.push({
            serviceName: service.service.name as string,
            serviceId: service.service.id,
            cost: service.service.cost,
          });
        });
      });

      const res = roomDetail?.Student.map(async (student) => {
        return await sendInvoiceEmail(
          student.email,
          student.fullName,
          mailBody,
        );
      });
      if (res) {
        const dataInvoice = {
          roomId: room.roomId,
          invoiceDate:
            data?.invoiceDate + "/" + new Date().getFullYear().toString(),
          total: mailBody?.detail?.reduce(
            (total: number, item: any) => total + item.cost,
            0,
          ),
          detail: JSON.stringify(mailBody),
          status: 0,
        };
        const addInvoices = await createInvoices(dataInvoice);
        if (addInvoices) {
          return addInvoices;
        }
      }
    });
    if (response) {
      return { success: "success" };
    }
    return { error: "error" };
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
