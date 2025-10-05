import { User } from "@knowledgescout/schemas";
import { createMiddleware } from "hono/factory";
import { API_HEADER } from "~/config/CONSTS";

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header(API_HEADER);

  if (!authHeader || authHeader.length === 0) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const user = await User.findOne({ apiKey: authHeader }).lean();

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  c.set("user", user);

  await next();
});
