import { User, UserRole } from "@prisma/client";

export type STUDENT = {
  id: string;
  email: string;
  fullName: string;
  major?: string;
  schoolYear?: number;
  birthDate?: Date;
  gender?: string;
  address?: string;
  phone?: string;
};
