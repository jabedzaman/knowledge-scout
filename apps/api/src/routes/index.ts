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
