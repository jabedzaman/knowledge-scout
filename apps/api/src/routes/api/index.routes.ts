import { Hono } from "hono";
import { ApiError } from "~/lib";
import { IndexService } from "~/services";
import { AuthSession } from "~/types";

export const indexRoutes = new Hono<AuthSession>();
const indexService = new IndexService();

// POST /api/index/rebuild - Rebuild document index
indexRoutes.post("/rebuild", async (c) => {
  const userId = c.get("user")?._id;

  if (!userId) {
    throw new ApiError(401, "UNAUTHORIZED", "User not authenticated");
  }

  const result = await indexService.rebuildIndex(userId);

  return c.json(result);
});

// GET /api/index/stats - Get index statistics
indexRoutes.get("/stats", async (c) => {
  const result = await indexService.getStats();
  return c.json(result);
});
