import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRouters,
  publicRoutes,
  adminRoutes,
  userRoutes,
} from "@/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isUserRoute = nextUrl.pathname.startsWith(userRoutes);
  const isAuthRoute = authRouters.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    return;
  }

  if (!isLoggedIn && (isAdminRoute || isUserRoute)) {
    let callbackUrk = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrk += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrk);
    return NextResponse.redirect(
      new URL(`/auth/signin?callback=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
