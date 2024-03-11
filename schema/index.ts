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
