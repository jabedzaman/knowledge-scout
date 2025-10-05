import { model, Schema } from "mongoose";
import { IQueryCache } from "~/interfaces";

/**
 * Mongoose schema for the QueryCache model.
 * This model stores cached query results to optimize performance.
 */
const QueryCacheSchema = new Schema<IQueryCache>(
  {
    queryHash: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    query: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    result: {
      answer: String,
      sources: [
        {
          text: { type: String, required: true },
          page: { type: Number, required: true },
          filename: { type: String, required: true },
          docId: {
            type: Schema.Types.ObjectId,
            ref: "Document",
            required: true,
          },
          score: { type: Number, required: true },
        },
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 60000), // 60 seconds from now
      index: { expires: 0 }, // TTL index - expires at the expireAt date
    },
  },
  {
    timestamps: false, // Automatically manage createdAt and updatedAt fields
  }
);

export const QueryCache = model<IQueryCache>("QueryCache", QueryCacheSchema);
