import Joi from "joi";
import { User } from "../../models";
import { CustomErrorHandler, TokenService } from "../../services";
import bcrypt from "bcrypt";

const loginController = {
  async login(req, res, next) {
    // validation
    const loginSchema = Joi.object({
      username: Joi.string().min(5).max(15).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,25}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      //! The code below this line will not execute until the Promise returned
      //! by Model.findOne() is resolved
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      // password comparison
      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      // generate token
      const access_token = TokenService.sign({
        _id: user._id,
        name: user.name,
        username: user.username,
      });

      res.json({ access_token: access_token });
    } catch (error) {
      return next(error);
    }
  },
};

export default loginController;
