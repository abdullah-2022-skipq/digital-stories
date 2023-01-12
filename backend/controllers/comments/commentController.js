import Joi from 'joi';
import { Comment, Engagement, Story } from '../../models';
import { CustomErrorHandler } from '../../services';
import { PostCommentsDTO } from '../../dtos';

const commentController = {
  async createComment(req, res, next) {
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
      story: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = createCommentSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { text, user, story } = req.body;
    try {
      const newComment = new Comment({
        text,
        user,
        story,
      });

      await newComment.save();

      // update count in story
      const storyRes = await Story.findOneAndUpdate(
        { _id: story },
        { $inc: { commentCount: 1 } },
        { new: true },
      );

      // create doc in engagements
      const newEngagement = new Engagement({
        action: 'comment',
        byUser: user,
        onPost: story,
        forUser: storyRes.postedBy,
      });

      await newEngagement.save();

      return res.status(201).json('comment posted successfully');
    } catch (error) {}
  },

  async getCommentsByPostId(req, res, next) {
    const getCommentsByPostIdSchema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = getCommentsByPostIdSchema.validate(req.params);

    if (error) return next(error);

    try {
      const comments = await Comment.find({ story: req.params.id }).populate(
        'user',
      );

      if (!comments) {
        return next(CustomErrorHandler.notFound());
      }

      const commentsDto = [];

      for (let i = 0; i < comments.length; i++) {
        const obj = new PostCommentsDTO(comments[i]);
        commentsDto.push(obj);
      }

      return res.status(200).json({ comments: commentsDto });
    } catch (error) {
      //
    }
  },
};

export default commentController;
