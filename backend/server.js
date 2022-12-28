import express from "express";
import { PORT } from "./config";
import router from "./routes/index";
import { errorHandler } from "./middlewares/";

const app = express();
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Backend Server is up and running on port ${PORT} 🚀`);
});
