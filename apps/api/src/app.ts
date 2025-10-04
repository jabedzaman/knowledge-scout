import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

/**
 * The main application instance.
 */
export const app = new Hono();

// middlewares
app.use(cors({ origin: "*" }));
app.use("*", logger());

// routes
app.get("/", (c) => c.json({ message: "Hello, Knowledge Scout!" }));
