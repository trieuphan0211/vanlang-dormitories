import { StatusMaintenance } from "@prisma/client";
import { FACILITIES } from "./facilities";

export type MAINTENNANCES = {
  id: string;
  code: string;
  startDate: Date;
  mantainanceName: string;
  description?: string;
  status: StatusMaintenance;
  createDate: Date;
  facilities?: FACILITIES[];
};
