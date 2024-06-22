import {
  StatusInOut,
  StatusViolate,
  UserRole,
  ViolateType,
} from "@prisma/client";
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
  roomId?: string;
  studentId?: string;
  total: number;
  createDate: Date;
  violateId?: string;
  status: number;
  detail: string;
  invoiceMonth: string;
  invoiceYear: string;
  Room?: ROOM;
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

  studentId: string;
  typeViolateCode: string;
  status: StatusViolate;
  date: string;
  formProcessing: string;
  description: string;
  metaData: string | null;
  updateDate: Date;
  createDate: Date;
  Student?: STUDENT;
  TypeViolate?: ViolateType;
};

export type ROOM = {
  id: string;
  code: string;
  floor: number;
  branchId: string;
  roomTypeCode: string;
  allowRegisterDate: Date;
  Branch?: BRANCH;
  RoomType?: ROOMTYPE;
  Services?: Array<any>;
  Student?: Array<any>;
  Register?: Array<any>;
  description?: string;
};

export type STUDENT = {
  id: string;
  image?: string;
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
  point?: number;
  Room?: ROOM;

  roomId?: string;
  Violate?: VIOLATE[];
};

export type REGISTER = {
  id: string;
  studentEmail: string;
  roomId: string;
  registerdeadline: number;
  status: number;
  createDate: Date;
  updateDate: Date;
  Student: STUDENT;
  Room?: ROOM;
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
  maintenanceId?: string;
  branchId?: string;
  code: string;
  Branch?: BRANCH;
  FacilitiesType?: FACILITIESTYPE;
  roomId?: string;
  Room?: ROOM;
  updateDate: Date;
  createDate: Date;
};

export type MAINTENNANCES = {
  id: string;
  code: string;
  mantainanceName: string;
  branchId: string;
  reason?: string;
  roomId?: string;
  status: StatusMaintenance;
  createDate: Date;
  Facilities?: FACILITIES[];
  Branch: BRANCH;
  Room?: ROOM;
  updateDate: Date;
};
export type INOUT = {
  id: string;
  studentId: string;
  status: StatusInOut;
  createDate: Date;
  Student?: STUDENT;
};
