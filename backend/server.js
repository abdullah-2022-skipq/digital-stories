import express from "express";
import { PORT, MONGO_DB_LOCAL } from "./config";
import router from "./routes/index";
import { errorHandler } from "./middlewares/";

const mongoose = require("mongoose");

const PATH = "mongodb://127.0.0.1:27017/digital-stories";

mongoose.connect(PATH);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log(`Database connected on server ${PATH} 😄`);
});

const app = express();
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Backend Server is up and running on port ${PORT} 🚀`);
});
