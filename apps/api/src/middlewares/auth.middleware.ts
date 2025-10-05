import { User } from "@knowledgescout/schemas";
import { createMiddleware } from "hono/factory";
import { API_HEADER } from "~/config/CONSTS";
import { ApiError } from "~/lib/error";

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header(API_HEADER);

  if (!authHeader || authHeader.length === 0) {
    throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
  }

  const user = await User.findOne({ apiKey: authHeader }).lean();

  if (!user) {
    throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
  }

  c.set("user", user);

  await next();
});
