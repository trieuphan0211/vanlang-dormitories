import { UserRole } from "@prisma/client";
import { StatusFacilities } from "@prisma/client";
import { StatusMaintenance } from "@prisma/client";

export type BRANCH = {
  id: string;
  img?: string;
  name: string;
  address: string;
  floorNumber?: number;
  description?: string;
};
export type INVOICE = {
  id: string;
  roomId: string;
  studentId: string;
  total: number;
  room: ROOM;
  createDate: Date;
  status: number;
  detail: string;
  invoiceDate: string;
  Student?: STUDENT;
};
export type SERVICES = {
  id: string;
  unit: string;
  name: string;
  cost: number;
  allow: boolean;
  description?: string;
};

export type ROOMTYPE = {
  id: string;
  name: string;
  members: number;
  description?: string;
  code: string;
  cost: number;
};
export type VIOLATE = {
  id: string;
  name: string;
  studentId?: string;
  description: string;
  Student?: STUDENT;
};

export type ROOM = {
  id: string;
  code: string;
  floor: number;
  branchId: string;
  roomTypeCode: string;
  branch: BRANCH;
  roomType?: ROOMTYPE;
  Services?: Array<any>;
  Student?: Array<any>;
  Register?: Array<any>;
  description?: string;
};

export type STUDENT = {
  id: string;
  cccdCode?: string;
  cccdOfDate?: string;
  cccdPlace?: string;
  fullName: string;
  gender?: string;
  brithday?: string;
  nation?: string;
  religion?: string;
  email: string;
  phone?: number;
  studentCode?: string;
  major?: string;
  schoolYear?: number;
  bankName?: string;
  bankBranch?: string;
  bankAccount?: string;
  bankNumber?: string;
  permanentResidence?: string;
  familiInfo?: string;
  contactinfo?: string;
  room?: ROOM;
};

export type REGISTER = {
  id: string;
  studentEmail: string;
  roomId: string;
  registerdeadline: number;
  status: number;
  createDate: Date;
  student: STUDENT;
  room?: ROOM;
};

export type USER = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image: string;
  signinTime: Date;
};

export type FACILITIESTYPE = {
  id: string;
  name: string;
  description?: string;
  code: string;
};

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
