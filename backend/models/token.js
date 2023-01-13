import mongoose from "mongoose";

const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("RefreshToken", tokenSchema, "tokens");
