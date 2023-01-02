import { ACCESS_TOKEN_SECRET } from "../config";
import jwt from "jsonwebtoken";

class TokenService {
  static sign(payload, expiryTime = "300s", secret = ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiryTime });
  }

  static verify(token, secret = TOKEN_SECRET) {
    return jwt.verify(token, secret);
  }
}

export default TokenService;
