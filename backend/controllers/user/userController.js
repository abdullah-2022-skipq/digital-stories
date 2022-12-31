import { User } from "../../models";
import { CustomErrorHandler } from "../../services";
import { UserDetailsDTO } from "../../dtos/user-details-dto";

const userController = {
  async myDetails(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const responseDto = new UserDetailsDTO(user);

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }

      res.json(responseDto);
    } catch (error) {
      return next(error);
    }
  },
};

export default userController;
