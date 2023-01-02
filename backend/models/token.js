import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("RefreshToken", tokenSchema, "tokens");
