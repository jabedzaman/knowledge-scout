import { Hono } from "hono";
import { authMiddleware } from "~/middlewares";
import { AuthSession } from "~/types";

export const userRoutes = new Hono<AuthSession>();

userRoutes.use("*", authMiddleware);

// GET /api/user/me - Get the authenticated user's details
userRoutes.get("/me", (c) => {
  const user = c.get("user");
  return c.json({ user });
});
