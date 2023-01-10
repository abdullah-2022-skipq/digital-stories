import Joi from "joi";
import { Engagement } from "../../models";
import { Story } from "../../models";

const votesController = {
  async upVote(req, res, next) {
    /*
        1. check if already liked
         -> if yes then delete record and return
        2. check if already disliked
         -> if yes then delete dislike record and add like record
        if no then add like record

        in any case, update story collection accordingly

        */

    const likeSchema = Joi.object({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      post: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = likeSchema.validate(req.body);

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

      return res.status(200).json({ message: "upvoted before, now -1" });
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

      // update story
      await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { downVoteCount: -1 } },
        { new: true }
      );

      return res.status(200).json({ message: "downvoted before, now level" });
    }

    const story = await Story.findOneAndUpdate(
      { _id: post },
      { $inc: { upVoteCount: 1 } },
      { new: true }
    );

    // console.log(story);
    // return;

    // if not both then add record for upvote
    const newLike = new Engagement({
      action: "upvote",
      onPost: post,
      byUser: user,
      forUser: story.postedBy,
    });

    await newLike.save();

    return res.status(200).json({ message: "nothing before, now +1" });
  },
};
export default votesController;
