"use server";

import { createRoomType } from "@/data/room-type";
import { createService, deleteService, updateService } from "@/data/services";
import { ServiceSchema } from "@/schema";
import * as z from "zod";

export const addService = async (value: z.infer<typeof ServiceSchema>) => {
  const validateValue = ServiceSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { serviceName, cost, description } = validateValue.data;
  try {
    const service = await createService({
      name: serviceName,
      cost: Number(cost),
      description,
    });
    return { success: "Service is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeService = async (id: string) => {
  try {
    const service = await deleteService(id);
    console.log("Service is removed!");
    return { success: "Service is removed!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const updateServiceById = async (
  id: string,
  value: z.infer<typeof ServiceSchema>,
) => {
  const validateValue = ServiceSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { serviceName, cost, description } = validateValue.data;
  try {
    const branch = await updateService(id, {
      name: serviceName,
      cost: Number(cost),
      description,
    });
    return { success: "Branch is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
