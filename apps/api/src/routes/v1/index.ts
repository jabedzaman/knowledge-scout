import { Hono } from "hono";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { docsRoutes } from "./docs.routes";
import { askRoutes } from "./ask.routes";

export const v1Routes = new Hono();

v1Routes.route("/auth", authRoutes);
v1Routes.route("/user", userRoutes);
v1Routes.route("/docs", docsRoutes);
v1Routes.route("/ask", askRoutes);
