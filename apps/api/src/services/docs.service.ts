import { Chunk, Document } from "@knowledgescout/schemas";
import { Types } from "mongoose";
import { ApiError, generateEmbeddings } from "~/lib";
import { parseDocument } from "~/lib/parser";
import { ListDocumentQuery } from "~/validators";

export class DocsService {
  listDocuments = async (userId: string, query: ListDocumentQuery) => {
    const { limit = 10, offset = 0 } = query;

    const documents = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    const total = await Document.countDocuments({ userId });

    return {
      items: documents,
      total,
      limit,
      offset,
      totalPages: Math.ceil(total / limit),
    };
  };

  getDocumentById = async (docId: string, userId?: string) => {
    const document = await Document.findOne({
      _id: docId,
    }).lean();
    if (!document) {
      throw new ApiError(404, "DOCUMENT_NOT_FOUND", "Document not found");
    }
    return document;
  };

  uploadDocument = async (file: File, userId: string) => {
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
      const pageChunks = this.chunkText(page.text, 512, 50);

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

    return { document: documentDoc, chunks: chunksToStore.length };
  };

  chunkText = (text: string, chunkSize: number, overlap: number): string[] => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize - overlap) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };
}
