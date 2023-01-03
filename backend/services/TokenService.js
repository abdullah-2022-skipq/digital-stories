import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY_TIME_DEBUG,
  REFRESH_TOKEN_SECRET,
} from "../config";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../models";

class TokenService {
  static sign(
    payload,
    expiryTime = ACCESS_TOKEN_EXPIRY_TIME_DEBUG,
    secret = ACCESS_TOKEN_SECRET
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiryTime });
  }

  static verify(token, secret = ACCESS_TOKEN_SECRET) {
    return jwt.verify(token, secret);
  }

  static verifyRefreshToken(token, secret = REFRESH_TOKEN_SECRET) {
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
