import { model, Schema } from "mongoose";
import * as bcrypt from "bcryptjs";
import { IUser } from "~/interfaces";

/**
 * Mongoose schema and model for User.
 * Represents a user
 */
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shareToken: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

UserSchema.index({ email: 1 }, { unique: true });

// pre save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password here using your preferred hashing library
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const User = model<IUser>("User", UserSchema);
