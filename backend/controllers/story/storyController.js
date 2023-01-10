import Joi from "joi";
import { Story, User } from "../../models";
import multer from "multer"; // [] todo
import Jimp from "jimp";
import path from "path";
import fs from "fs";
import { CustomErrorHandler } from "../../services";

const storyController = {
  async create(req, res, next) {
    const createStorySchema = Joi.object({
      // [] multi-conditional data validation
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

      let imgPath = `${Date.now()}-${Math.round(Math.random() * 100000)}.png`;

      try {
        const jimpRes = await Jimp.read(buffer);

        jimpRes
          //   .resize(200, Jimp.AUTO) i want to keep original res intact
          .write(path.resolve(__dirname, `../../storage/${imgPath}`));
      } catch (error) {
        //
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

      let videoPath = `${Date.now()}-${Math.round(
        Math.random() * 100000
      )}.webm`;

      try {
        fs.writeFileSync(
          path.resolve(__dirname, `../../storage/${videoPath}`),
          buffer
        );
      } catch (error) {
        //
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

      return res.status(200).json({ stories });
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

    try {
      const story = await Story.findOne({ _id: req.params.id }).populate(
        "postedBy"
      );

      if (!story) {
        return next(CustomErrorHandler.notFound());
      }

      return res.status(200).json({ story });
    } catch (error) {
      //
    }
  },

  async getTrending(req, res, next) {
    console.log("called");
    try {
      const stories = await Story.find({}).sort({
        upVoteCount: -1,
        commentCount: -1,
      });
      console.log(stories);
      return res.status(200).json({ trending: stories });
    } catch (error) {
      console.log(error);
    }
  },
};

export default storyController;
