import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const curentUser = await db.user
        .findUniqueOrThrow({
          where: { id: user.id || "" },
        })
        .then((res) => res)
        .catch((err) => null);
      console.log("curentUser: ", curentUser);
      if (!curentUser) return true;
      if (!(account?.provider === "azure-ad")) return true;
      await db.user.update({
        where: { id: user.id },
        data: { signinTime: new Date() },
      });
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      // Check id
      if (!token.sub) return token;
      //  Get user by id
      const existingUser = await getUserById(token.sub);
      // If user is not found return token
      if (!existingUser) return token;
      // Set user details to token
      token.name = existingUser.name;
      token.email = existingUser.email;
      // Set user role to token
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
