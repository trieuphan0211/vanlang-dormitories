/**
 * An array of routes that are public
 * These routes are accessible to everyone
 * @type {string[]}
 */
export const publicRoutes = ["/", "/room"];

/**
 * An array of routes that are protected
 * These routes are only accessible to authenticated users
 * @type {string[]}
 */
export const authRouters = ["/auth/signin", "/error"];

/**
 * An array of routes that are only accessible to admin users
 * @type {string}
 */

export const adminRoutes = "/admin";

/**
 * An array of routes that are only accessible to user users
 * @type {string}
 */
export const userRoutes = "/home";

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
