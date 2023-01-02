import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  DEBUG_MODE,
  MONGO_DB_LOCAL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  BASE_URL,
} = process.env;
