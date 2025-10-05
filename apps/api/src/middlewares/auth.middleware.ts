import { User } from "@knowledgescout/schemas";
import { createMiddleware } from "hono/factory";
import { API_HEADER, SHARE_TOKEN_HEADER } from "~/config/CONSTS";
import { ApiError } from "~/lib/error";

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header(API_HEADER);
  const shareToken = c.req.header(SHARE_TOKEN_HEADER);

  const user = await User.findOne({
    $or: [{ apiKey: authHeader }, { shareToken }],
  }).lean();

  if (!user) {
    throw new ApiError(401, "UNAUTHORIZED", "Unauthorized");
  }

  c.set("user", { _id: user._id.toString() });

  await next();
});
