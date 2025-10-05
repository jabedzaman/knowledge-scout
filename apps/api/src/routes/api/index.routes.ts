import { Hono } from "hono";
import { authMiddleware } from "~/middlewares";
import { IndexService } from "~/services";
import { AuthSession } from "~/types";

export const indexRoutes = new Hono<AuthSession>();
const indexService = new IndexService();

indexRoutes.use("*", authMiddleware);

// POST /api/index/rebuild - Rebuild document index
indexRoutes.post("/rebuild", async (c) => {
  const userId = c.get("user")?._id;

  const result = await indexService.rebuildIndex(userId!);

  return c.json(result);
});

// GET /api/index/stats - Get index statistics
indexRoutes.get("/stats", async (c) => {
  const userId = c.get("user")?._id;

  const result = await indexService.getStats(userId!);

  return c.json(result);
});
