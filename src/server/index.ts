/**
 * Server Module Exports
 *
 * Central export point for all server-side modules.
 * This helps with TypeScript module resolution.
 *
 * @module server/index
 * @category Server - Backend
 */

export { createContext } from "./context";
export type { Context } from "./context";
export {
  appRouter,
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "./router";
export type { AppRouter } from "./router";
