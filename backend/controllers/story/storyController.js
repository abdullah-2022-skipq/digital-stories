import Joi from "joi";
import Jimp from "jimp";
import path from "path";
import fs from "fs";
import { Comment, Engagement, Story } from "../../models";
import { CustomErrorHandler } from "../../services";
import { StoryDTO, StoryDetailsDTO } from "../../dtos";

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

    if (mediaType === "text") {
      const { font, fontColor, caption, postedBy } = req.body;
      const newStory = new Story({
        mediaType,
        font,
        caption,
        fontColor,
        postedBy,
      });

      await newStory.save();
    }

    if (mediaType === "image") {
      const { caption, postedBy, image } = req.body;

      // preprocess the image

      const buffer = Buffer.from(
        image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
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
      });

      await newStory.save();
    }

    if (mediaType === "video") {
      const { caption, postedBy, video } = req.body;

      // preprocess the video

      const buffer = Buffer.from(
        video.replace(/^data:video\/(webm);base64,/, ""),
        "base64"
      );

      const videoPath = `${Date.now()}-${Math.round(
        Math.random() * 100000
      )}.webm`;

      try {
        fs.writeFileSync(
          path.resolve(__dirname, `../../storage/${videoPath}`),
          buffer
        );
      } catch (err) {
        return next(err);
      }
      const newStory = new Story({
        mediaType,
        caption,
        video: `http://localhost:5544/storage/${videoPath}`,
        postedBy,
      });

      await newStory.save();
    }

    return res.status(201).json({ message: "story created successfully" });
  },

  async getAll(req, res, next) {
    try {
      const stories = await Story.find().populate("postedBy");

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
      story = await Story.findOne({ _id: req.params.id }).populate("postedBy");

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
      const stories = await Story.find({})
        .sort({
          upVoteCount: -1,
          commentCount: -1,
        })
        .populate("postedBy");

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

      return res.status(200).json({ message: "story deleted successfully" });
    } catch (err) {
      return next(err);
    }
  },
};

export default storyController;
