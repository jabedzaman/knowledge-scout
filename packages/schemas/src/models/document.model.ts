import { model, Model, Schema } from "mongoose";
import { IDocument } from "~/interfaces";

/**
 * Mongoose schema for the Document model.
 * Represents a document uploaded by a user.
 */
const DocumentSchema = new Schema<IDocument>(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    totalPages: {
      type: Number,
      required: true,
      min: 1,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
      enum: ["application/pdf"],
    },
    filePath: {
      type: String,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "indexed", "failed"],
      default: "uploaded",
      index: true,
    },
    indexedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Compound indexes for access control queries
DocumentSchema.index({ userId: 1, status: 1 });

export const Document = model<IDocument>("Document", DocumentSchema);
