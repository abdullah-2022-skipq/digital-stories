import CustomErrorHandler from "../services/CustomErrorHandler";
import { TokenService } from "../services";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log(token);
    const { _id, name, username } = await TokenService.verify(token);
    const user = {
      _id,
      name,
      username,
    };

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
