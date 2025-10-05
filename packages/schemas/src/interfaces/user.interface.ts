import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;

  apiKey: string; // The actual API key string
  shareToken: string; // Token used for sharing documents

  createdAt: Date;
  updatedAt: Date;
}
