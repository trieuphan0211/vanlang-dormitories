"use server";
import crypto from "crypto";
import * as z from "zod";

import { getFacilitiesById, updateFacilities } from "@/data/facilities";
import {
  createMaintenance,
  deleteMaintenance,
  getMaintainanceByDateBranch,
  getMaintenancesById,
  updateMaintenance,
} from "@/data/mantainance";
import { MaintenanceSchema } from "@/schema";
import { FACILITIES, MAINTENNANCES } from "@/types";

export const addManitainance = async (
  value: z.infer<typeof MaintenanceSchema>,
) => {
  // validate value
  const validateValue = MaintenanceSchema.safeParse(value);
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  // get value
  const { listFacilities, mantainanceName, status, branchId, reason, roomId } =
    validateValue.data;
  // Check Facilities
  if (listFacilities !== undefined) {
    // get facilities and if check maintenceId in facility is exist return code
    const checkFacilities = await Promise.all(
      listFacilities.map(async (item: string) => {
        const facilities = (await getFacilitiesById(item)) as FACILITIES;
        if (facilities.maintenanceId) {
          return facilities.code;
        }
      }),
    );
    // check if facilities is in maintenance and return error
    if (checkFacilities.filter((item) => item !== undefined).length > 0) {
      return {
        error: "Facilities is in maintenance!",
        data: checkFacilities.filter((item) => item !== undefined),
      };
    }
  }
  // generate token
  const token = "MT" + crypto.randomInt(100, 1_000).toString();
  try {
    // create maintenance
    const res = await createMaintenance({
      code: token,
      mantainanceName,
      branchId,
      reason,
      roomId: roomId || undefined,
      status,
    });
    // check if maintenance is created
    if (res === null) {
      return { error: "An error occurred!" };
    }
    // check if facilities is in maintenance

    const updateFacilitiesforMaintainceId = await Promise.all(
      listFacilities.map(async (item: string) => {
        return await updateFacilities(item, {
          status: "MAINTENANCE",
          maintenanceId: res?.id,
        });
      }),
    );
    if (updateFacilitiesforMaintainceId === null) {
      return { error: "An error occurred!" };
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
  if (maintenance?.Facilities !== undefined) {
    maintenance.Facilities.map(async (item) => {
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
  const { mantainanceName, status, reason, branchId, roomId, listFacilities } =
    validateValue.data;
  try {
    const res = await updateMaintenance(id, {
      mantainanceName,
      status,
      reason,
      branchId,
      roomId: roomId || undefined,
    });
    if (!res?.id) {
      return { error: "An error occurred!" };
    }
    if (res.status == "FINISHED" && res.id) {
      const maintenance = await getMaintenancesById(res.id);
      maintenance?.Facilities.map(async (item) => {
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
    return { success: "Maintenance is updated!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred!" };
  }
};

export const getMaintainanceForDashboard = async (
  branchId?: string,
  startDate?: string,
  finishDate?: string,
) => {
  const year = [] as number[];
  const maintenances = await getMaintainanceByDateBranch({
    branchId,
    startDate,
    finishDate,
  });
  maintenances?.map((maintenance) => {
    if (!year.includes(new Date(maintenance.updateDate).getFullYear())) {
      year.push(new Date(maintenance.updateDate).getFullYear());
    }
  });
  const result = [] as {
    month: string;
    status: { CREATED: number; INPROGRESS: number; FINISHED: number };
  }[];
  year.map((year) => {
    Array.from({ length: 12 }).map((z, index) => {
      const newMaintainance = maintenances
        ?.filter(
          (maintenance) =>
            new Date(maintenance.updateDate).getFullYear() === year,
        )
        .filter(
          (maintenance) =>
            new Date(maintenance.updateDate).getMonth() === index,
        );
      if ((newMaintainance?.length || 0) > 0) {
        result.push({
          month: index + 1 + "/" + year,
          status: {
            CREATED:
              newMaintainance?.filter((item) => item.status === "CREATED")
                .length || 0,
            INPROGRESS:
              newMaintainance?.filter((item) => item.status === "INPROGRESS")
                .length || 0,
            FINISHED:
              newMaintainance?.filter((item) => item.status === "FINISHED")
                .length || 0,
          },
        });
      }
    });
  });

  return result;
};
