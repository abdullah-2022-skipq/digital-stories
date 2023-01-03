import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  DEBUG_MODE,
  MONGO_DB_LOCAL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY_TIME_DEBUG,
  REFRESH_TOKEN_SECRET,
  BASE_URL,
  DEFAULTAVATAR,
} = process.env;
