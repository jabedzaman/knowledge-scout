import { createMiddleware } from "hono/factory";
import { IDEMPOTENCY_HEADER } from "~/config/CONSTS";

const cache = new Map<string, Response>();

/**
 * Idempotency Middleware
 */
export const idempotencyMiddleware = createMiddleware(async (c, next) => {
  const idempotencyKey = c.req.header(IDEMPOTENCY_HEADER);
  console.log("Idempotency Key:", idempotencyKey);

  if (idempotencyKey && c.req.method === "POST") {
    if (cache.has(idempotencyKey)) {
      return cache.get(idempotencyKey)!.clone();
    }

    await next();

    const response = c.res.clone();
    cache.set(idempotencyKey, response);

    // clear cache after a certain time to prevent memory bloat
    setTimeout(() => {
      cache.delete(idempotencyKey);
    }, 5 * 60 * 1000); // 5 minutes

    return response;
  } else {
    await next();
  }
});
