import express from "express";
import {
  registerController,
  loginController,
  userController,
} from "../controllers/";
import { auth } from "../middlewares";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.myDetails);

export default router;
