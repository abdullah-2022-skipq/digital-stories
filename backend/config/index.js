import dotenv from "dotenv";

dotenv.config();

export const { PORT, DEBUG_MODE, MONGO_DB_LOCAL, TOKEN_SECRET } = process.env;
