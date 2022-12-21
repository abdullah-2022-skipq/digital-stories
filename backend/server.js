import express from "express";
import { PORT, MONGO_DB_LOCAL } from "./config";
import router from "./routes/index";
import { errorHandler } from "./middlewares/";
import mongoose from "mongoose";

mongoose.connect(MONGO_DB_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log(`Database connected 😄`);
});

const app = express();
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Backend Server is up and running on port ${PORT} 🚀`);
});
