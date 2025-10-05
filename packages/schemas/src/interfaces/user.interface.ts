import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;

  apiKey: string; // The actual API key string

  createdAt: Date;
  updatedAt: Date;
}
