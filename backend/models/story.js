import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    caption: { type: String, default: "" },
    image: { type: String, default: "" },
    video: { type: String, default: "" },
    bgColor: { type: Number, required: true, default: 0 },
    font: { type: Number, required: true, default: 0 },
    upVoteCount: { type: Number, default: 0 },
    downVoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    postedBy: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

storySchema.virtual("trendingScore").get(function () {
  return `${this.upVotes} + ${this.downVotes} + ${this.commentCount}`;
});

// leaderboard => aggreage stories by postedBy etc
// post

export default mongoose.model("Story", storySchema, "stories");
