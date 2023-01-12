import { User } from "../../models"; // note this aint importing a default exported thing, its destructuring probably
import { CustomErrorHandler } from "../../services";
import { UserDetailsDTO } from "../../dtos/";

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
