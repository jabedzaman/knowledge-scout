import { Hono } from "hono";
import { authMiddleware } from "~/middlewares";
import { AuthSession } from "~/types";

export const userRoutes = new Hono<AuthSession>();

userRoutes.use("*", authMiddleware);

// GET /api/user - Get the authenticated user's details
userRoutes.get("/", (c) => {
  const user = c.get("user");
  return c.json({ user });
});
