import express from "express";
import { PORT } from "./config";
import { router } from "./routes/index";
import { errorHandler } from "./middlewares/";
import { dbConnect } from "./database";
import cors from "cors";

dbConnect();

const app = express();

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Backend Server is up and running on port ${PORT}`);
});
