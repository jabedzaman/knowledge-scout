import { Hono } from "hono";
import { apiRoutes } from "./api";
import { ApiError } from "~/lib";

/**
 * Main application routes
 */
export const routes = new Hono();

// Mount API routes at /api
routes.route("/api", apiRoutes);

// health check endpoint
routes.get("/health", (c) => c.json({ status: "ok" }));

// _meta endpoint
routes.get("/_meta", (c) =>
  c.json({
    name: "My Application",
    version: "1.0.0",
    description: "This is a sample application.",
  })
);

//.well-known/hackathon.json endpoint
routes.get("/.well-known/hackathon.json", (c) =>
  c.json({
    name: "My Application",
    description: "This is a sample application.",
  })
);

// Fallback for undefined routes
routes.all("*", (c) => {
  throw new ApiError(404, "NOT_FOUND", "The requested resource was not found.");
});
