import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
  logoutController,
  storyController,
  commentController,
  votesController,
  engagementController,
  leaderboardController,
} from "../controllers";

import { auth } from "../middlewares";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.myDetails);
router.get("/refresh", refreshController.refresh);
router.post("/logout", auth, logoutController.logout);
router.get("/stories", auth, storyController.getAll);
router.post("/stories", auth, storyController.create);
router.get("/stories/trending", auth, storyController.getTrending);
router.get("/stories/:id", auth, storyController.getById);
router.delete("/stories/:id", auth, storyController.deleteById);
router.post("/comment", auth, commentController.createComment);
router.get("/comments/:id", auth, commentController.getCommentsByPostId);
router.post("/upvote", auth, votesController.upVote);
router.post("/downvote", auth, votesController.downVote);
router.get("/engagements", auth, engagementController.getEngagements);
router.get("/leaderboard", auth, leaderboardController.getLeaderboard);

export default router;
