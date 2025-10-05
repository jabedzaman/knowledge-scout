import { Chunk, Document } from "@knowledgescout/schemas";
import { Hono } from "hono";
import { ApiError, generateEmbeddings } from "~/lib";
import { parseDocument } from "~/lib/parser";
import { AuthSession } from "~/types";
import { authMiddleware } from "~/middlewares";
import { Types } from "mongoose";

export const docsRoutes = new Hono<AuthSession>();

docsRoutes.use("*", authMiddleware);

// POST /api/docs - Upload document
docsRoutes.post("/", async (c) => {
  const body = await c.req.parseBody();
  const file = body.file;
  const userId = c.get("user")?._id;

  if (typeof file === "string") {
    throw new ApiError(400, "NO_FILE_UPLOADED", "No file uploaded");
  }

  // parse document (PDF)
  const { pages, text } = await parseDocument(file);

  // store document metadata
  const documentDoc = await Document.create({
    filename: file.name,
    originalName: file.name,
    userId: userId!,
    totalPages: pages.length,
    fileSize: file.size,
    mimeType: file.type,
    isPrivate: false,
  });

  const chunks: {
    docId: Types.ObjectId;
    pageNumber: number;
    chunkIndex: number;
    text: string;
  }[] = [];
  for (const page of pages) {
    // Chunk each page's text
    const pageChunks = chunkText(page.text, 512, 50);

    // Create chunk objects with page numbers
    pageChunks.forEach((chunkText, idx) => {
      chunks.push({
        docId: documentDoc._id,
        pageNumber: page.num,
        chunkIndex: idx,
        text: chunkText,
      });
    });
  }

  // Generate embeddings for all chunks
  const embeddings = await generateEmbeddings(chunks.map((c) => c.text));

  // Store chunks with embeddings
  const chunksToStore = chunks.map((chunk, idx) => ({
    ...chunk,
    embedding: embeddings[idx],
    tokenCount: chunk.text.split(" ").length,
  }));

  await Chunk.insertMany(chunksToStore).then(() => {
    console.log(`Inserted ${chunksToStore.length} chunks`);
  });

  return c.json({ document: documentDoc, pages, text }, 201);
});

const chunkText = (
  text: string,
  chunkSize: number,
  overlap: number
): string[] => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
};
