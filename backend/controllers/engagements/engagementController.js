import Joi from "joi";
import { Engagement } from "../../models";

const engagementController = {
  async getEngagements(req, res, next) {
    const engagementSchema = Joi.object({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = engagementSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { user } = req.body;

    // 1. get what this user did
    // 2. get what others did to this user
    const yourEngagments = await Engagement.find({ byUser: user });
    const othersEngagements = await Engagement.find({ forUser: user });

    return res
      .status(200)
      .json({ you: yourEngagments, others: othersEngagements });
  },
};

export default engagementController;
