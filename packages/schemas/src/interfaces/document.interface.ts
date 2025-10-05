import { Document, Types } from "mongoose";

export interface IDocument extends Document {
  _id: Types.ObjectId;
  filename: string;
  originalName: string;
  userId: Types.ObjectId;
  uploadedAt: Date;
  isPrivate: boolean;
  shareToken?: string;
  totalPages: number;
  fileSize: number;
  mimeType: string;
  filePath: string;
  status: "uploaded" | "processing" | "indexed" | "failed";
  indexedAt?: Date;
  metadata?: {
    author?: string;
    title?: string;
    subject?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}
