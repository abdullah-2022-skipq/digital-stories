import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    mediaType: { type: String, required: true },
    font: { type: String },
    fontColor: { type: String },
    caption: { type: String },
    image: { type: String, default: "" },
    video: { type: String, default: "" },
    upVoteCount: { type: Number, default: 0 },
    downVoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    postedBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

storySchema.virtual("trendingScore").get(function () {
  return `${this.upVotes} + ${this.downVotes} + ${this.commentCount}`;
});

// leaderboard => aggreage stories by postedBy etc
// post

export default mongoose.model("Story", storySchema, "stories");
