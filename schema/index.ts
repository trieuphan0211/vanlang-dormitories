import { StatusFacilities, UserRole } from "@prisma/client";
import * as z from "zod";

// Branch Schema
export const BranchSchema = z
  .object({
    name: z.string().min(1, "Tên chi nhánh không được để trống"),
    address: z.string().min(5, "Địa chỉ không được để trống"),
    numberFloors: z.string(),
    description: z.optional(z.string()),
    image: z.optional(
      z.object({
        name: z.string(),
        type: z.string(),
        value: z.string(),
      }),
    ),
  })
  .refine(
    (data) => {
      if (Number(data.numberFloors) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Số tầng phải lớn hơn 0",
      path: ["numberFloors"],
    },
  );
export const RoomTypeSchema = z
  .object({
    roomTypeName: z.string().min(1, "Tên loại phòng không được để trống"),
    description: z.optional(z.string()),
    members: z.string(),
    code: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (Number(data.members) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Số lượng thành viên phải lớn hơn 0",
      path: ["members"],
    },
  );

export const UserSchema = z.object({
  name: z.string().min(1, "Tên người dùng không được để trống"),
  email: z.string().email(),
  role: z.enum([
    UserRole.ADMIN,
    UserRole.USER,
    UserRole.DIRECTOR,
    UserRole.STAFF,
  ]),
});
export const FacilitiesSchema = z
  .object({
    name: z.string().min(1, "Tên cơ sở vật chất không được để trống"),
    description: z.optional(z.string()),
    code: z.optional(z.string()),
    status: z.optional(
      z.enum([
        StatusFacilities.ACTIVE,
        StatusFacilities.INACTIVE,
        StatusFacilities.MAINTENANCE,
        StatusFacilities.LIQUIDATION,
      ]),
    ),
    branchId: z.optional(z.string()),
    facilitiesTypeCode: z.string(),
    count: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (Number(data.count) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Số lượng phải lớn hơn 0",
      path: ["count"],
    },
  )
  .refine(
    (data) => {
      if (data.facilitiesTypeCode === "") {
        return false;
      }
      return true;
    },
    {
      message: "Loại cơ sở vật chất không được để trống",
      path: ["facilitiesTypeCode"],
    },
  );
export const FacilitiesTypeSchema = z.object({
  facilitesTypeName: z
    .string()
    .min(1, "Tên loại cơ sở vật chất không được để trống"),
  description: z.optional(z.string()),
  code: z.optional(z.string()),
});

export const ServiceSchema = z
  .object({
    serviceName: z.string().min(1, "Tên dịch vụ không được để trống"),
    description: z.string(),
    cost: z.string(),
  })
  .refine(
    (data) => {
      if (Number(data.cost) < 1000) {
        return false;
      }
      return true;
    },
    {
      message: "Giá tiền phải lớn hơn 1000",
      path: ["cost"],
    },
  );
