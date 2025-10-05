import { model, Schema } from "mongoose";
import { IUser } from "~/interfaces";
import { toJSON } from "./plugins";

/**
 * Mongoose schema and model for User.
 * Represents a user with an API key.
 */
const UserSchema = new Schema<IUser>(
  {
    apiKey: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// plugins
UserSchema.plugin(toJSON);

export const User = model<IUser>("User", UserSchema);
