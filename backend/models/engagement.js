import mongoose from "mongoose";

const Schema = mongoose.Schema;

const engagementSchema = new Schema(
  {
    action: { type: String, required: true },
    byUser: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    onPost: { type: mongoose.SchemaTypes.ObjectId, ref: "stories" },
    forUser: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("Engagement", engagementSchema, "engagements");
