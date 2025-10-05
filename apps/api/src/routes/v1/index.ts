import { Hono } from "hono";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

export const v1Routes = new Hono();

v1Routes.route("/auth", authRoutes);
v1Routes.route("/user", userRoutes);
