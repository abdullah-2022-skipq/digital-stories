import CustomErrorHandler from '../services/CustomErrorHandler';
import { TokenService } from '../services';
import { User } from '../models';
import { UserDetailsDTO } from '../dtos';

// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const { _id } = await TokenService.verify(accessToken);

    // get user details
    const userDetails = await User.findOne({ _id });

    const userDetailsDto = new UserDetailsDTO(userDetails);

    req.user = userDetailsDto;

    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
