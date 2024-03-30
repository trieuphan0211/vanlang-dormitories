import { StatusFacilities } from "@prisma/client";
import { BRANCH } from "@/types/branch";
import { FACILITIESTYPE } from "@/types/facilitie-type";

export type FACILITIES = {
  id: string;
  name: string;
  description?: string;
  facilitiesTypeCode: string;
  status: StatusFacilities;
  branchId?: string;
  code: string;
  branch?: BRANCH;
  roomId?: string;
  facilitiesType?: FACILITIESTYPE;
};
