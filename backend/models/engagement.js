import mongoose from "mongoose";

const Schema = mongoose.Schema;

const engagementSchema = new Schema(
  {
    action: { type: String, required: true },
    byUser: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    onPost: { type: mongoose.SchemaTypes.ObjectId, ref: "Story" },
    forUser: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Engagement", engagementSchema, "engagements");
