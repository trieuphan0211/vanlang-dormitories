"use server";

import * as z from "zod";
import { SignupSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/users";
import { db } from "@/lib/db";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  // Validate the value
  const validateValues = SignupSchema.safeParse(values);
  // Check if the value is not valid
  if (!validateValues.success) {
    return { error: "Invalid Values!" };
  }
  // If the value is valid, continue to the next step
  const { name, email, password } = validateValues.data;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check email if it's already exist
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exist!" };
  }

  // If the email is not exist, create a new user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  return { success: "Sign Up success!" };
};
