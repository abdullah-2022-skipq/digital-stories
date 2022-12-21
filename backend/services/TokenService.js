import { TOKEN_SECRET } from "../config";
import jwt from "jsonwebtoken";

class TokenService {
  static sign(payload, expiryTime = "300s", secret = TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiryTime });
  }
}

export default TokenService;
