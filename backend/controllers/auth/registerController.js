import Joi from "joi";
import { CustomErrorHandler, TokenService } from "../../services";
import { User } from "../../models";
import bcrypt from "bcrypt";

const registerController = {
  async register(req, res, next) {
    // validation
    const registerSchema = Joi.object({
      name: Joi.string().min(5).max(30).required(),
      username: Joi.string().min(5).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,25}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
      avatarPath: Joi.string().default("default"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // check if user already exists
    try {
      const emailTaken = await User.exists({
        email: req.body.email,
      });

      const usernameTaken = await User.exists({
        username: req.body.username,
      });

      if (emailTaken) {
        return next(
          CustomErrorHandler.userAlreadyExists(
            "A user with this email is already registered!"
          )
        );
      }

      if (usernameTaken) {
        return next(
          CustomErrorHandler.userAlreadyExists(
            "Username is already taken, please try with another username!"
          )
        );
      }
    } catch (error) {
      return next(error);
    }

    const { name, username, email, password, avatarPath } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      avatarPath,
    });

    let accessToken;

    try {
      const result = await newUser.save();

      // return token to client
      accessToken = TokenService.sign({
        _id: result._id,
        name: result.name,
        username: result.username,
      });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token: accessToken });
  },
};

export default registerController;
