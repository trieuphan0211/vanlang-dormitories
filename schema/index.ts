import { StatusFacilities, StatusMaintenance, UserRole } from "@prisma/client";
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
export const InvoceSchema = z
  .object({
    invoiceMonth: z.string(),
    invoiceYear: z.string().min(1, "Năm không được để trống"),
    detail: z.array(
      z.object({
        roomId: z.string(),
        service: z.array(
          z.object({
            serviceId: z.string(),
            quantity: z.string().min(1, "Số lượng không được để trống"),
          }),
        ),
      }),
    ),
  })
  .refine(
    (data) => {
      if (Number(data.invoiceMonth) < 1) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: "Tháng không được để trống",
      path: ["invoiceMonth"],
    },
  )
  .refine(
    (data) => {
      if (Number(data.invoiceYear) < 1) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: "Năm phải lớn hơn 0",
      path: ["invoiceYear"],
    },
  );
export const RoomTypeSchema = z
  .object({
    roomTypeName: z.string().min(1, "Tên loại phòng không được để trống"),
    description: z.optional(z.string()),
    members: z.string(),
    code: z.optional(z.string()),
    cost: z.string(),
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
  )
  .refine(
    (data) => {
      if (Number(data.cost) < 1000) {
        return false;
      }
      return true;
    },
    {
      message: "Số tiền phải lớn hơn 1000 đồng",
      path: ["cost"],
    },
  );

export const RoomSchema = z
  .object({
    roomTypeCode: z.string().min(1, "Tên loại phòng không được để trống"),
    description: z.optional(z.string()),
    code: z.optional(z.string()),
    branchId: z.string().min(1, "Chi nhánh không đc để trống"),
    floor: z.number(),
    count: z.optional(z.string()),
    services: z.optional(z.array(z.string())),
  })
  .refine(
    (data) => {
      if (Number(data.floor) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Số tầng phải lớn hơn 0",
      path: ["floor"],
    },
  )
  .refine(
    (data) => {
      if (Number(data.count) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Nhập số phòng ít nhất là 1",
      path: ["count"],
    },
  )
  .refine(
    (data) => {
      if (data.services?.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: "Chọn ít nhất 1 dịch vụ",
      path: ["services"],
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
export const StudentInfoSchema = z.object({
  cccdCode: z.string().min(1, "Số CCCD không được để trống"),
  cccdOfDate: z.string().min(1, "Ngày cấp không được để trống"),
  cccdPlace: z.string().min(1, "Nơi cấp không được để trống"),
  fullName: z.string().min(1, "Họ tên không được để trống"),
  gender: z.string().min(1, "Giới tính không được để trống"),
  brithday: z.string().min(1, "Ngày sinh không được để trống"),
  nation: z.string().min(1, "Dân tộc không được để trống"),
  religion: z.string().min(1, "Tôn giáo không được để trống"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  studentCode: z.string().min(1, "Mã sinh viên không được để trống"),
  major: z.string().min(1, "Ngành học không được để trống"),
  schoolYear: z.string().min(1, "Năm học không được để trống"),
  bankName: z.string().min(1, "Tên ngân hàng không được để trống"),
  bankBranch: z.string().min(1, "Chi nhánh ngân hàng không được để trống"),
  bankAccount: z.string().min(1, "Số tài khoản không được để trống"),
  bankNumber: z.string().min(1, "Số thẻ không được để trống"),
  permanentResidence: z.object({
    address: z.string().min(1, "Địa chỉ không được để trống"),
    district: z.string().min(1, "Quận/Huyện không được để trống"),
    city: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
    ward: z.string().min(1, "Phường/Xã không được để trống"),
  }),
  familiInfo: z.array(
    z.object({
      name: z.string().min(1, "Tên không được để trống"),
      birthYear: z.string().min(1, "Năm sinh không được để trống"),
      phone: z.string().min(1, "Số điện thoại không được để trống"),
      job: z.string().min(1, "Nghề nghiệp không được để trống"),
      address: z.string().min(1, "Địa chỉ không được để trống"),
    }),
  ),
  contactinfo: z.object({
    name: z.string().min(1, "Tên không được để trống"),
    phone: z.string().min(1, "Số điện thoại không được để trống"),
    address: z.string().min(1, "Địa chỉ không được để trống"),
    city: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
    district: z.string().min(1, "Quận/Huyện không được để trống"),
  }),
});
export const ViolateSchema = z.object({
  violateName: z.string().min(1, "Tên vi phạm không được để trống"),
  violateTypeCode: z.string().min(1, "Loại vi phạm không được để trống"),
  studentId: z.string().min(1, "Mã sinh viên không được để trống"),
  description: z.optional(z.string()),
});
export const ViolateTypeSchema = z
  .object({
    violateTypeName: z.string().min(1, "Tên loại vi phạm không được để trống"),
    point: z.string(),
    description: z.optional(z.string()),
    allow: z.boolean(),
  })
  .refine(
    (data) => {
      if (Number(data.point) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Điểm vi phạm phải lớn hơn 0",
      path: ["point"],
    },
  );
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
    branchId: z.string(),
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
  )
  .refine(
    (data) => {
      if (data.branchId === "") {
        return false;
      }
      return true;
    },
    {
      message: "Chi nhánh không được để trống",
      path: ["branchId"],
    },
  );
export const FacilitiesTypeSchema = z.object({
  facilitesTypeName: z
    .string()
    .min(1, "Tên loại cơ sở vật chất không được để trống"),
  description: z.optional(z.string()),
  code: z.optional(z.string()),
});

export const MaintenanceSchema = z
  .object({
    code: z.optional(z.string().min(1, "Mã bảo trì không được để trống")),
    mantainanceName: z.string().min(1, "Tên bảo trì không được để trống"),
    description: z.optional(z.string()),
    listFacilities: z.optional(z.array(z.string())), // Fix: Added empty object as argument

    startDate: z.date(),
    status: z.enum([
      StatusMaintenance.CREATED,
      StatusMaintenance.FINISHED,
      StatusMaintenance.INPROGRESS,
    ]),
  })
  .refine(
    (data) => {
      if (data.startDate === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Ngày bắt đầu không được để trống",
      path: ["startDate"],
    },
  );

export const ServiceSchema = z
  .object({
    serviceName: z.string().min(1, "Tên dịch vụ không được để trống"),
    description: z.string(),
    cost: z.string(),
    unit: z.string().min(1, "Đơn vị rỗng"),
    allow: z.boolean(),
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
