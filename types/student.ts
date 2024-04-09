import { User, UserRole } from "@prisma/client";

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
};
