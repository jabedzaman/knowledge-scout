import { model, Model, Schema } from "mongoose";
import { IDocument } from "~/interfaces";
import { paginate, toJSON } from "./plugins";
import { FilterAndOptions, PaginatedDefaultResult } from "~/types";

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
    isPrivate: {
      type: Boolean,
      default: true,
      index: true,
    },
    shareToken: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
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
    metadata: {
      author: String,
      title: String,
      subject: String,
      keywords: [String],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Compound indexes for access control queries
DocumentSchema.index({ userId: 1, status: 1 });
DocumentSchema.index({ isPrivate: 1, status: 1 });

// Plugins
DocumentSchema.plugin(toJSON);
DocumentSchema.plugin(paginate);

type DocumentModel = Model<IDocument> & {
  paginate(props: FilterAndOptions): Promise<PaginatedDefaultResult<IDocument>>;
};

export const Document = model<IDocument, DocumentModel>(
  "Document",
  DocumentSchema
);
