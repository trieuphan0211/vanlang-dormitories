"use server";
import crypto from "crypto";
import * as z from "zod";

import { MaintenanceSchema } from "@/schema";
import { updateFacilities } from "@/data/facilities";
import {
  createMaintenance,
  deleteMaintenance,
  getMaintenancesById,
  updateMaintenance,
} from "@/data/mantainance";
import { MAINTENNANCES } from "@/types/maintenances";
import { FACILITIES } from "@/types/facilities";

export const addManitainance = async (
  value: z.infer<typeof MaintenanceSchema>,
) => {
  const validateValue = MaintenanceSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { listFacilities, mantainanceName, status, description, startDate } =
    validateValue.data;

  const token = "MT" + crypto.randomInt(100, 1_000).toString();
  try {
    const updateFacilitiess = async (item: string) => {
      const response = await updateFacilities(item, {
        status: "MAINTENANCE",
        maintenanceId: res?.id,
      });
      if (response === null) {
        return { error: "An error occurred!" };
      }
    };
    const res = await createMaintenance({
      code: token,
      mantainanceName,
      description: description || "",
      startDate: startDate || new Date(),
      status,
    });
    console.log(res);
    if (res === null) {
      return { error: "An error occurred!" };
    }
    if (listFacilities !== undefined) {
      listFacilities.map((item: string) => {
        updateFacilitiess(item);
      });
    }
    return { success: "Maintenance is created!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const removeMaintenance = async (id: string) => {
  const maintenance = (await getMaintenancesById(id)) as MAINTENNANCES;
  if (maintenance === null) {
    return { error: "Maintenance not found!" };
  }
  if (maintenance?.facilities !== undefined) {
    maintenance.facilities.map(async (item) => {
      if (item.roomId) {
        const response = await updateFacilities(item.id, {
          status: "ACTIVE",
          maintenanceId: undefined,
        });
        if (response === null) {
          return { error: "An error occurred!" };
        }
      } else {
        const response = await updateFacilities(item.id, {
          status: "INACTIVE",
          maintenanceId: undefined,
        });
        if (response === null) {
          return { error: "An error occurred!" };
        }
      }
    });
  }
  try {
    const res = await deleteMaintenance(id);
    if (res === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Maintenance is deleted!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const updateMaintenanceById = async (
  id: string,
  value: z.infer<typeof MaintenanceSchema>,
) => {
  const validateValue = MaintenanceSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  const { mantainanceName, status, description } = validateValue.data;
  try {
    const res = await updateMaintenance(id, {
      mantainanceName,
      status,
      description,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Maintenance is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};
