import { Hono } from "hono";
import mongoose from "mongoose";
import { generateEmbeddings, mongo } from "~/lib";

export const askRoutes = new Hono();

askRoutes.post("/", async (c) => {
  const { query, k = 5 } = await c.req.json();

  // Generate embedding for the query - returns [[...384 numbers]]
  const queryEmbedding = await generateEmbeddings([query]);

  // Vector search with access control
  const results = await mongo
    .collection("chunks")
    .aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryEmbedding[0], // ✅ Use first element (1D array)
          numCandidates: k * 10,
          limit: k,
        },
      },
      {
        $lookup: {
          from: "documents",
          localField: "docId",
          foreignField: "_id",
          as: "document",
        },
      },
      {
        $project: {
          text: 1,
          pageNumber: 1,
          score: { $meta: "vectorSearchScore" },
          docId: 1,
          filename: { $arrayElemAt: ["$document.filename", 0] },
        },
      },
    ])
    .toArray();

  const answer = {
    query,
    sources: results.map((r) => ({
      text: r.text,
      page: r.pageNumber,
      filename: r.filename,
      docId: r.docId,
      score: r.score,
    })),
  };

  return c.json(answer);
});
