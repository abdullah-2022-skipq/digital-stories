import Joi from 'joi';
import Jimp from 'jimp';
import path from 'path';
import { Comment, Engagement, Story } from '../../models';
import { CustomErrorHandler } from '../../services';
import { StoryDTO, StoryDetailsDTO } from '../../dtos';

const storyController = {
  async create(req, res, next) {
    const createStorySchema = Joi.object({
      mediaType: Joi.string().required(),
      font: Joi.string(),
      fontColor: Joi.string(),
      caption: Joi.optional(),
      image: Joi.string(),
      video: Joi.string(),
      upVoteCount: Joi.number(),
      isPrivate: Joi.boolean().required(),
      downVoteCount: Joi.number(),
      commentCount: Joi.number(),
      // https://stackoverflow.com/a/73638013
      postedBy: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = createStorySchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { mediaType } = req.body;

    if (mediaType === 'text') {
      const { font, fontColor, caption, postedBy, isPrivate } = req.body;
      const newStory = new Story({
        mediaType,
        font,
        caption,
        fontColor,
        postedBy,
        isPrivate,
      });

      await newStory.save();
    }

    if (mediaType === 'image') {
      const { caption, postedBy, isPrivate, image } = req.body;

      // preprocess the image

      const buffer = Buffer.from(
        image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
        'base64'
      );

      const imgPath = `${Date.now()}-${Math.round(Math.random() * 100000)}.png`;

      try {
        const jimpRes = await Jimp.read(buffer);

        jimpRes
          //   .resize(200, Jimp.AUTO) i want to keep original res intact
          .write(path.resolve(__dirname, `../../storage/${imgPath}`));
      } catch (err) {
        return next(err);
      }
      const newStory = new Story({
        mediaType,
        caption,
        image: `http://localhost:5544/storage/${imgPath}`,
        postedBy,
        isPrivate,
      });

      await newStory.save();
    }

    if (mediaType === 'video') {
      const { caption, isPrivate, postedBy } = req.body;

      const newStory = new Story({
        mediaType,
        caption,
        video: `http://localhost:5544/storage/${req.file.filename}`,
        postedBy,
        isPrivate,
      });

      await newStory.save();
    }

    return res.status(201).json({ message: 'story created successfully' });
  },

  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;

      const { userId } = req.query;

      const limit = 7;

      let stories;

      if (userId) {
        stories = await Story.paginate(
          { postedBy: userId },
          { page, limit, populate: 'postedBy', sort: { createdAt: -1 } }
        );
      } else {
        stories = await Story.paginate(
          { isPrivate: false },
          { page, limit, populate: 'postedBy', sort: { createdAt: -1 } }
        );
      }

      if (!stories) {
        return next();
      }
      const storiesDto = [];

      for (let i = 0; i < stories.docs.length; i += 1) {
        const obj = new StoryDTO(stories.docs[i]);

        storiesDto.push(obj);
      }

      return res.status(200).json({
        stories: storiesDto,
        totalPages: stories.totalPages,
        page: stories.page,
        hasNextPage: stories.hasNextPage,
        hasPrevPage: stories.hasPrevPage,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req, res, next) {
    const getStoryByIdSchema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = getStoryByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    let story;

    try {
      story = await Story.findOne({ _id: req.params.id }).populate('postedBy');

      if (!story) {
        return next(CustomErrorHandler.notFound());
      }
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ story: new StoryDetailsDTO(story) });
  },

  async getTrending(req, res, next) {
    try {
      const stories = await Story.find({ isPrivate: false })
        .sort({
          upVoteCount: -1,
          commentCount: -1,
        })
        .limit(20)
        .populate('postedBy');

      const storiesDto = [];

      for (let i = 0; i < stories.length; i += 1) {
        const obj = new StoryDTO(stories[i]);
        storiesDto.push(obj);
      }

      return res.status(200).json({ stories: storiesDto });
    } catch (error) {
      return next(error);
    }
  },

  async deleteById(req, res, next) {
    const deleteStoryByIdSchema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = deleteStoryByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    try {
      const story = await Story.deleteOne({ _id: req.params.id });

      if (!story) {
        return next(CustomErrorHandler.notFound());
      }

      const comments = await Comment.deleteMany({ story: req.params.id });

      if (!comments) {
        return next(CustomErrorHandler.notFound());
      }

      const engagements = await Engagement.deleteMany({
        onPost: req.params.id,
      });

      if (!engagements) {
        return next(CustomErrorHandler.notFound());
      }

      return res.status(200).json({ message: 'story deleted successfully' });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    const updateStorySchema = Joi.object({
      mediaType: Joi.string().required(),
      font: Joi.string(),
      fontColor: Joi.string(),
      caption: Joi.optional(),
      image: Joi.string().allow(''),
      video: Joi.string().allow(''),
      storyId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = updateStorySchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { mediaType, storyId } = req.body;

    if (mediaType === 'text') {
      const { font, fontColor, caption } = req.body;

      await Story.updateOne(
        { _id: storyId },
        {
          $set: {
            mediaType,
            font,
            caption,
            fontColor,
          },
        }
      );
    }

    if (mediaType === 'image') {
      const { caption, image } = req.body;

      if (image === '') {
        await Story.updateOne(
          { _id: storyId },
          {
            $set: {
              mediaType,
              caption,
            },
          }
        );
      } else {
        // preprocess the image

        const buffer = Buffer.from(
          image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
          'base64'
        );

        const imgPath = `${Date.now()}-${Math.round(
          Math.random() * 100000
        )}.png`;

        try {
          const jimpRes = await Jimp.read(buffer);

          jimpRes
            //   .resize(200, Jimp.AUTO) i want to keep original res intact
            .write(path.resolve(__dirname, `../../storage/${imgPath}`));
        } catch (err) {
          return next(err);
        }

        await Story.updateOne(
          { _id: storyId },
          {
            $set: {
              mediaType,
              caption,
              image: `http://localhost:5544/storage/${imgPath}`,
            },
          }
        );
      }
    }

    if (mediaType === 'video') {
      const { caption } = req.body;

      // if video middleware sends a filename then video should be updated
      // otherwise only caption should be updated
      if (req.file) {
        await Story.updateOne(
          { _id: storyId },
          {
            $set: {
              mediaType,
              caption,
              video: `http://localhost:5544/storage/${req.file.filename}`,
            },
          }
        );
      } else {
        await Story.updateOne(
          { _id: storyId },
          {
            $set: {
              mediaType,
              caption,
            },
          }
        );
      }
    }

    return res.status(200).json({ message: 'story updated successfully' });
  },

  async updateAccessMode(req, res, next) {
    const updateAccessModeSchema = Joi.object({
      isPrivate: Joi.boolean().required(),
      storyId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = updateAccessModeSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { storyId, isPrivate } = req.body;

    await Story.updateOne(
      { _id: storyId },
      {
        $set: {
          isPrivate,
        },
      }
    );

    return res
      .status(200)
      .json({ message: 'story access mode updated successfully' });
  },
};

export default storyController;
