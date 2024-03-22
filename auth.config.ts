import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { SigninSchema } from "./schema";
import { getUserByEmail } from "@/data/users";
import bcrypt from "bcryptjs";
import AzureAd from "next-auth/providers/azure-ad";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    AzureAd({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = await SigninSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
