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

// health check endpoint
apiRoutes.get("/health", (c) => c.json({ status: "ok" }));

// metadata endpoint
apiRoutes.get("/_meta", (c) => {
  return c.json({
    name: "KnowledgeScout",
    version: "0.1.0",
    description: "Document Q&A system with semantic search",
    endpoints: {
      auth: ["POST /api/auth/post"],
      user: ["GET /api/user"],
      documents: [
        "POST /api/docs",
        "GET /api/docs?limit=&offset=",
        "GET /api/docs/:id",
      ],
      query: ["POST /api/ask"],
      indexing: ["POST /api/index/rebuild", "GET /api/index/stats"],
      meta: [
        "GET /api/health",
        "GET /api/_meta",
        "GET /.well-known/hackathon.json",
      ],
    },
    rateLimit: {
      window: "60 seconds",
      maxRequests: 60,
    },
    features: [
      "Basic Auth with EMAIL and PASSWORD",
      "Vector Search with MongoDB Atlas",
      "Query Caching (60s TTL)",
      "Rate Limiting (60 req/min/user)",
    ],
  });
});
