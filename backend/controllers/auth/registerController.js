import Joi from 'joi';
import bcrypt from 'bcrypt';
import { CustomErrorHandler, TokenService } from '../../services';
import { User } from '../../models';
import { UserDetailsDTO } from '../../dtos';
import {
  REFRESH_TOKEN_SECRET,
  DEFAULTAVATAR,
  API_SECRET,
  CLOUD_NAME,
  API_KEY,
} from '../../config';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const registerController = {
  async register(req, res, next) {
    // validation
    const registerSchema = Joi.object({
      name: Joi.string().max(30).required(),
      username: Joi.string().max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/)
        .required(),
      confirmPassword: Joi.ref('password'),
      avatarPath: Joi.string().default('default'),
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
            'A user with this email is already registered!'
          )
        );
      }

      if (usernameTaken) {
        return next(
          CustomErrorHandler.userAlreadyExists(
            'Username is already taken, please try with another username!'
          )
        );
      }
    } catch (err) {
      return next(err);
    }

    const { name, username, email, password } = req.body;

    let { avatarPath } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const imgPath = DEFAULTAVATAR;

    if (!avatarPath) {
      avatarPath = imgPath;
    }

    let response;

    if (avatarPath !== DEFAULTAVATAR) {
      try {
        response = await cloudinary.uploader.upload(avatarPath, {
          eager: [{ width: 200, crop: 'scale' }],
        });
      } catch (err) {
        return next(
          CustomErrorHandler.failedImageProcessing(
            'Could not process the image'
          )
        );
      }
    }

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      avatarPath: avatarPath === DEFAULTAVATAR ? imgPath : response.url,
    });

    let accessToken;
    let refreshToken;

    let result;

    try {
      result = await newUser.save();

      // return token to client
      accessToken = TokenService.sign({
        _id: result._id,
      });

      refreshToken = TokenService.sign(
        {
          _id: result._id,
        },
        '1y',
        REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return next(err);
    }

    // save refresh token to database
    await TokenService.storeRefreshToken(result._id, refreshToken);

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDetailsDTO(newUser);

    return res.status(201).json({ user: userDto, auth: true });
  },
};

export default registerController;
