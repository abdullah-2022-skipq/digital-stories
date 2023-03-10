import Joi from 'joi';
import bcrypt from 'bcrypt';
import { RefreshToken, User } from '../../models';
import { CustomErrorHandler, TokenService } from '../../services';
import { REFRESH_TOKEN_SECRET } from '../../config';
import { UserDetailsDTO } from '../../dtos';

const loginController = {
  async login(req, res, next) {
    // validation
    const loginSchema = Joi.object({
      username: Joi.string().max(20).required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{8,25}$/)
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    let userDto;

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
      const accessToken = TokenService.sign({
        _id: user._id,
      });

      const refreshToken = TokenService.sign(
        { _id: user._id },
        '1y',
        REFRESH_TOKEN_SECRET
      );

      // create user's refresh token
      // if no token not found then create one

      await RefreshToken.updateOne(
        { userId: user._id },
        { refreshToken },
        { upsert: true }
      );

      res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      userDto = new UserDetailsDTO(user);
    } catch (err) {
      return next(err);
    }

    return res.status(200).json({ user: userDto, auth: true });
  },
};

export default loginController;
