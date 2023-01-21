import { RefreshToken } from '../../models';

const logoutController = {
  async logout(req, res, next) {
    try {
      // delete the token from db

      const { refreshToken } = req.cookies;

      await RefreshToken.deleteOne({ refreshToken });

      // delete cookies
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      res.json({ user: null, auth: false });
    } catch (error) {
      next(error);
    }
  },
};

export default logoutController;
