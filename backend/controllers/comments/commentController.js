import { Comment, Engagement, Story } from "../../models";
import Joi from "joi";

const commentController = {
  async createComment(req, res, next) {
    try {
      // notes
      /* 
        when a user makes a comment then we should
        1. create a doc in comments collection
        2. update count of comments in stories collection
        3. create a doc in engagements section
        */

      const createCommentSchema = Joi.object({
        text: Joi.string().required(),
        user: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        post: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      });

      const { error } = createCommentSchema.validate(req.body);

      if (error) {
        return next(error);
      }

      const { text, user, post } = req.body;

      const newComment = new Comment({
        text,
        user,
        post,
      });

      await newComment.save();

      // update count in story
      const story = await Story.findOneAndUpdate(
        { _id: post },
        { $inc: { commentCount: 1 } },
        { new: true }
      );

      // create doc in engagements
      const newEngagement = new Engagement({
        action: "comment",
        byUser: user,
        onPost: post,
        forUser: story.postedBy,
      });

      await newEngagement.save();

      return res.status(201).json("comment posted successfully");
    } catch (error) {}
  },
};

export default commentController;
