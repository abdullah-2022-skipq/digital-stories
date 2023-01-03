import { TokenService } from "../../services";
import { REFRESH_TOKEN_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";
import { UserDetailsDTO } from "../../dtos/user-details-dto";

const refreshController = {
  async refresh(req, res, next) {
    // steps
    // get refresh token from cookie
    // verify the token
    // generate a new token
    // update record in db

    //* https://davidwalsh.name/destructuring-alias
    const { refreshToken: originalRefreshToken } = req.cookies;

    let userDetails;

    try {
      userDetails = await TokenService.verifyRefreshToken(originalRefreshToken);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const token = await RefreshToken.findOne({
        userId: userDetails._id,
        refreshToken: originalRefreshToken,
      });

      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      return next(error);
    }

    try {
      const accessToken = TokenService.sign({ _id: userDetails._id });

      const refreshToken = TokenService.sign(
        {
          _id: userDetails._id,
        },
        "1y",
        REFRESH_TOKEN_SECRET
      );

      await RefreshToken.updateOne(
        { userId: userDetails._id },
        { refreshToken }
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      const user = await User.findOne({ _id: userDetails._id });

      const userDto = new UserDetailsDTO(user);

      res.status(200).json({ userDto, auth: true });
    } catch (error) {
      return next(error);
    }
  },
};
export default refreshController;
