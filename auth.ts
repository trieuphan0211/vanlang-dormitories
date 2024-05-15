import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/users";
import { JwkKeyExportOptions } from "crypto";

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
      const curentStudent = await db.student.findUnique({
        where: {
          email: user.email || "",
        },
      });
      if (curentStudent) return;
      await db.student.create({
        data: {
          email: user.email || "",
          fullName: user.name || "",
          createDate: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const curentUser = await db.user
        .findUniqueOrThrow({
          where: { id: user.id || "" },
        })
        .then((res) => res)
        .catch((err) => null);
      if (!curentUser) return true;
      if (!(account?.provider === "microsoft-entra-id")) return true;
      await db.user.update({
        where: { id: user.id },
        data: { signinTime: new Date() },
      });
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        if (token.verifiedInfo) {
          session.user.verifiedInfo = token.verifiedInfo as boolean;
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
      token.verifiedInfo = existingUser.verifiedInfo;
      // Set user role to token
      token.role = existingUser.role;

      return token;
    },
  },

  // jwt: {
  //   async encode(params: {
  //     token: JwkKeyExportOptions;
  //     secret: string;
  //     maxAge: number;
  //   }): Promise<string> {
  //     // return a custom encoded JWT string
  //     return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   },
  //   async decode(params: {
  //     token: string;
  //     secret: string;
  //   }): Promise<JWT | null> {
  //     // return a `JWT` object, or `null` if decoding failed
  //     return {};
  //   },
  // },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
