import * as z from "zod";

export const SigninSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6),
});

export const SignupSchema = z
  .object({
    name: z.string().min(1, {
      message: "Username must be at least 1 characters long",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6),
    rePassword: z.string().min(6),
  })
  .refine(
    (data) => {
      if (data.password !== data.rePassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["rePassword"],
    },
  );

// Branch Schema
export const BranchSchema = z
  .object({
    name: z.string().min(1),
    address: z.string().min(5),
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
      message: "Number of floors must be at least 1",
      path: ["numberFloors"],
    },
  );
export const RoomTypeSchema = z
  .object({
    roomTypeName: z.string().min(1),
    description: z.string(),
    members: z.string(),
  })
  .refine(
    (data) => {
      if (Number(data.members) < 1) {
        return false;
      }
      return true;
    },
    {
      message: "memders must be at least 1",
      path: ["members"],
    },
  );
export const ServiceSchema = z
  .object({
    serviceName: z.string().min(1),
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
      message: "Cost must be at least 1000",
      path: ["cost"],
    },
  );
