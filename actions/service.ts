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
  const { serviceName, cost, description, unit, allow } = validateValue.data;
  try {
    const service = await createService({
      name: serviceName,
      cost: Number(cost),
      description,
      unit,
      allow,
    });
    console.log(`Service is created! ${JSON.stringify(service)}`);
    if (service?.id) {
      return { success: "Service is created!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
export const removeService = async (id: string) => {
  try {
    const service = await deleteService(id);
    console.log(`Service is removed! ${JSON.stringify(service)}`);
    if (service?.id) {
      return { success: "Service is removed!" };
    }
    return { error: "An error occurred!" };
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
  const { serviceName, cost, description, unit, allow } = validateValue.data;
  try {
    const service = await updateService(id, {
      name: serviceName,
      cost: Number(cost),
      description,
      unit,
      allow,
    });
    console.log(`Service is updated! ${JSON.stringify(service)}`);
    if (service?.id) {
      return { success: "Service is updated!" };
    }
    return { error: "An error occurred!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
