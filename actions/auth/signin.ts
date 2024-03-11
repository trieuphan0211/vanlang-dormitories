"use server";

import * as z from "zod";
import { SigninSchema } from "@/schema";
import { getUserByEmail } from "@/data/users";
import { signIn } from "@/auth";
import { getUserRoleById } from "@/data/userRole";
import { AuthError } from "next-auth";

export const signin = async (value: z.infer<typeof SigninSchema>) => {
  // Validate the value
  const validateValue = SigninSchema.safeParse(value);
  // Check if the value is not valid
  if (!validateValue.success) {
    return { error: "Invalid Values!" };
  }
  // If the value is valid, continue to the next step
  const { email, password } = validateValue.data;
  // Check if the user exists
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email is not found!" };
  }

  try {
    if (existingUser.role === "USER") {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/home",
      });
      return { success: "User is found!" };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An error occurred!" };
      }
    }
    throw error;
  }
  return { success: "User is found!" };
};
