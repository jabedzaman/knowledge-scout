import { Hono } from "hono";
import { apiRoutes } from "./api";

/**
 * Main application routes
 */
export const routes = new Hono();

// Mount API routes at /api
routes.route("/api", apiRoutes);
