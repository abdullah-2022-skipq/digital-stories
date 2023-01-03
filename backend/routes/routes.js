import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
} from "../controllers/";

import { auth } from "../middlewares";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.myDetails);
router.get("/refresh", refreshController.refresh);

export default router;
