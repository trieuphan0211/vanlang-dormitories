import { UserRole } from "@prisma/client";

export type USER = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image: string;
  signinTime: Date;
};
