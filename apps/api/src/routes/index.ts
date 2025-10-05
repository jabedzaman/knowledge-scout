import { Hono } from "hono";
import { apiRoutes } from "./api";
import { ApiError } from "~/lib";
import { rateLimiter } from "~/middlewares";
import { pagesRoutes } from "./pages";

/**
 * Main application routes
 */
export const routes = new Hono();

// html pages
routes.route("/", pagesRoutes);

// rate limiting middleware
routes.use("/api", rateLimiter);

// Mount API routes at /api
routes.route("/api", apiRoutes);

// health check endpoint
routes.get("/health", (c) => c.json({ status: "ok" }));

// metadata endpoint
routes.get("/_meta", (c) => {
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

//.well-known/hackathon.json endpoint
routes.get("/.well-known/hackathon.json", (c) =>
  c.json({
    problemStatement: "KnowledgeScout (Doc Q&A)",
    regNo: "12211810",
    documentation: "https://github.com/jabedzaman/knowledge-scout",
    features: [
      "Document upload and parsing (PDF)",
      "Vector embeddings with Transformers.js",
      "MongoDB Atlas Vector Search",
      "Query caching with 60-second TTL",
      "Share tokens for document sharing",
      "Rate limiting (60 req/min/user)",
    ],
    stack: {
      backend: "Hono + Node.js + TypeScript",
      database: "MongoDB Atlas",
      embeddings: "Transformers.js (Xenova/all-MiniLM-L6-v2)",
      authentication: "Basic Auth (Email + Password)",
      parsing: "pdf-parse",
    },
    testCredentials: {
      email: "admin@mail.com",
      password: "admin123",
    },
    _meta: "/_meta",
  })
);

// Fallback for undefined routes
routes.all("*", (c) => {
  throw new ApiError(404, "NOT_FOUND", "The requested resource was not found.");
});
