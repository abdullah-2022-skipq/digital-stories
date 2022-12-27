import { User } from "../../models";
import { CustomErrorHandler } from "../../services";

const userController = {
  async myDetails(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -email -avatarPath -createdAt -updatedAt -__v"
      );

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};

export default userController;
