import Joi from "joi";
import { EngagementDTO } from "../../dtos";
import { Engagement } from "../../models";

const engagementController = {
  async getEngagements(req, res, next) {
    const engagementSchema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = engagementSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    // 1. get what this user did
    // 2. get what others did to this user
    const yourEngagments = await Engagement.find({
      byUser: id,
      forUser: { $ne: id },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("byUser onPost forUser");

    const yourEngagementsDto = [];

    for (let i = 0; i < yourEngagments.length; i += 1) {
      const obj = new EngagementDTO(yourEngagments[i]);
      yourEngagementsDto.push(obj);
    }

    const othersEngagements = await Engagement.find({
      forUser: id,
      byUser: { $ne: id },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("byUser onPost forUser");

    const othersEngagementsDto = [];

    for (let i = 0; i < othersEngagements.length; i += 1) {
      const obj = new EngagementDTO(othersEngagements[i]);
      othersEngagementsDto.push(obj);
    }

    return res
      .status(200)
      .json({ you: yourEngagementsDto, others: othersEngagementsDto });
  },
};

export default engagementController;
