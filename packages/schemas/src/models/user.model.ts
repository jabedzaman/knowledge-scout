import { model, Schema } from "mongoose";
import { IUser } from "~/interfaces";

/**
 * Mongoose schema and model for User.
 * Represents a user with an API key.
 */
const UserSchema = new Schema<IUser>(
  {
    apiKey: { type: String, required: true, unique: true },
    shareToken: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export const User = model<IUser>("User", UserSchema);
