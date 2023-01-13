import { User } from "../../models"; // note this aint importing a default exported thing, its destructuring probably
import { CustomErrorHandler } from "../../services";
import { UserDetailsDTO } from "../../dtos";

const userController = {
  async myDetails(req, res, next) {
    let responseDto;

    try {
      const user = await User.findOne({ _id: req.user._id });

      responseDto = new UserDetailsDTO(user);

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
    } catch (error) {
      return next(error);
    }
    return res.json(responseDto);
  },
};

export default userController;
