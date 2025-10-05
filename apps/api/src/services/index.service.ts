import { Chunk, Document } from "@knowledgescout/schemas";
import { Types } from "mongoose";

export class IndexService {
  rebuildIndex = async (userId: string) => {
    const userDocs = await Document.find({ userId }).lean();

    // Generate chunks (with overlap)
    const chunks: {
      docId: Types.ObjectId;
      pageNumber: number;
      chunkIndex: number;
      text: string;
    }[] = [];

    // for (const page of pages) {
    //   const pageChunks = this.chunkText(page.text, 512, 50);
    //   pageChunks.forEach((chunk, idx) => {
    //     chunks.push({
    //       docId: documentDoc._id,
    //       pageNumber: page.pageNumber,
    //       chunkIndex: idx,
    //       text: chunk,
    //     });
    //   });
    // }

    // Generate embeddings
    // const embeddings = await generateEmbeddings(chunks.map((c) => c.text));

    // Store chunks with embeddings
    // const chunksWithEmbeddings = chunks.map((chunk, idx) => ({
    //   ...chunk,
    //   embedding: embeddings[idx],
    // }));
    await Chunk.deleteMany({ docId: { $in: userDocs.map((d) => d._id) } });
    // await Chunk.insertMany(chunksWithEmbeddings);

    return { chunks: chunks.length };
  };

  getStats = async () => {
    const totalDocs = await Document.countDocuments();
    const totalChunks = await Chunk.countDocuments();
    const indexedDocs = await Chunk.distinct("docId").then((ids) => ids.length);

    return { totalDocs, indexedDocs, totalChunks };
  };
}
