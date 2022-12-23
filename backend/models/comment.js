import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: { type: String },
    byUser: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    onStory: { type: mongoose.SchemaTypes.ObjectId, ref: "stories" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema, "comments");
