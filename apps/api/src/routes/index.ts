import { Hono } from "hono";
import { v1Routes } from "./v1";

export const routes = new Hono();

routes.route("/", v1Routes);
