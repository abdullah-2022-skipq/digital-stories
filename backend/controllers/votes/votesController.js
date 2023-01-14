import Joi from "joi";
import { Engagement, Story } from "../../models";

const votesController = {
  async upVote(req, res, next) {
    const upvoteSchema = Joi.object({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      post: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = upvoteSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { post, user } = req.body;

    // check already liked
    const voted = await Engagement.findOne({
      action: "upvote",
      byUser: user,
      onPost: post,
    });

    if (voted) {
      // delete record
      await Engagement.deleteOne({
        action: "upvote",
        byUser: user,
        onPost: post,
      });

      // update story
      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { upVoteCount: -1 } },
        { new: true }
      );

      return res.status(200).json({ message: "voted successfully" });
    }

    // check already disliked
    const downvoted = await Engagement.findOne({
      action: "downvote",
      byUser: user,
      onPost: post,
    });

    if (downvoted) {
      await Engagement.deleteOne({
        action: "downvote",
        byUser: user,
        onPost: post,
      });

      const newUpvote = new Engagement({
        action: "upvote",
        byUser: user,
        onPost: post,
      });

      await newUpvote.save();

      // update story
      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { downVoteCount: -1 } },
        { new: true }
      );
      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { upVoteCount: 1 } },
        { new: true }
      );

      return res.status(200).json({ message: "downvoted before, now level" });
    }

    const story = await Story.findOneAndUpdate(
      { _id: post },
      { $inc: { upVoteCount: 1 } },
      { new: true }
    );

    // if not both then add record for upvote
    const newUpvote = new Engagement({
      action: "upvote",
      onPost: post,
      byUser: user,
      forUser: story.postedBy,
    });

    await newUpvote.save();

    return res.status(200).json({ message: "voted successfully" });
  },

  async downVote(req, res, next) {
    const downVoteSchema = Joi.object({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      post: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = downVoteSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { post, user } = req.body;

    // check already disliked
    const downvoted = await Engagement.findOne({
      action: "downvote",
      byUser: user,
      onPost: post,
    });

    if (downvoted) {
      // delete record
      await Engagement.deleteOne({
        action: "downvote",
        byUser: user,
        onPost: post,
      });

      // update story
      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { downVoteCount: -1 } },
        { new: true }
      );

      return res.status(200).json({ message: "voted successfully" });
    }

    // check already liked
    const voted = await Engagement.findOne({
      action: "upvote",
      byUser: user,
      onPost: post,
    });

    if (voted) {
      await Engagement.deleteOne({
        action: "upvote",
        byUser: user,
        onPost: post,
      });

      const newDownvote = new Engagement({
        action: "downvote",
        byUser: user,
        onPost: post,
      });

      await newDownvote.save();

      // update story
      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { upVoteCount: -1 } },
        { new: true }
      );

      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { downVoteCount: 1 } },
        { new: true }
      );

      return res.status(200).json({ message: "voted successfully" });
    }

    const story = await Story.findOneAndUpdate(
      { _id: post },
      { $inc: { downVoteCount: 1 } },
      { new: true }
    );

    // if not both then add record for upvote
    const newDownvote = new Engagement({
      action: "downvote",
      onPost: post,
      byUser: user,
      forUser: story.postedBy,
    });

    await newDownvote.save();

    return res.status(200).json({ message: "voted successfully" });
  },

  async getVoteStatus(req, res, next) {
    const getVoteStatusSchema = Joi.object({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      post: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = getVoteStatusSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { user, post } = req.body;

    let voteStatus;
    let upVoted;
    let downVoted;

    try {
      upVoted = await Engagement.findOne({
        onPost: post,
        byUser: user,
        action: "upvote",
      });

      downVoted = await Engagement.findOne({
        onPost: post,
        byUser: user,
        action: "downvote",
      });
    } catch (err) {
      return next(err);
    }

    if (upVoted) {
      voteStatus = "upvote";
    } else if (downVoted) {
      voteStatus = "downvote";
    } else {
      voteStatus = "novote";
    }

    return res.status(200).json({ voteStatus });
  },
};
export default votesController;
