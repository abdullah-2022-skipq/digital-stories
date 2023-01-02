import { ACCESS_TOKEN_SECRET } from "../config";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../models";

class TokenService {
  static sign(payload, expiryTime = "1m", secret = ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiryTime });
  }

  static verify(token, secret = ACCESS_TOKEN_SECRET) {
    return jwt.verify(token, secret);
  }

  static async storeRefreshToken(userId, refreshToken) {
    try {
      const newRefreshToken = new RefreshToken({
        refreshToken,
        userId,
      });

      await newRefreshToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default TokenService;
