/**
 * An array of routes that are public
 * These routes are accessible to everyone
 * @type {string[]}
 */
export const publicRoutes = ["/", "/verification-account", "/reset-password"];

/**
 * An array of routes that are protected
 * These routes are only accessible to authenticated users
 * @type {string[]}
 */
export const authRouters = [
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
  "/auth/forgot-password",
];

/**
 * The prefix for the API routes
 * Routers that start with this prefix are considered API routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route after a user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
