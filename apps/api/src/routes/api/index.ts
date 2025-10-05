import { Hono } from "hono";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { docsRoutes } from "./document.routes";
import { askRoutes } from "./ask.routes";
import { indexRoutes } from "./index.routes";

export const apiRoutes = new Hono();

apiRoutes.route("/ask", askRoutes);
apiRoutes.route("/auth", authRoutes);
apiRoutes.route("/docs", docsRoutes);
apiRoutes.route("/index", indexRoutes);
apiRoutes.route("/user", userRoutes);
