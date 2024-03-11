import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  DEFAULT_ORTHER_LOGIN_REDIRECT,
  authRouters,
  publicRoutes,
  apiAuthPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRouters.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_ORTHER_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrk = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrk += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrk);
    return Response.redirect(
      new URL(`/auth/signin?callback=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
