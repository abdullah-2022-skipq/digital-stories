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
import upload from "../middlewares/video";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.myDetails);
router.get("/refresh", refreshController.refresh);
router.post("/logout", auth, logoutController.logout);
router.get("/stories", auth, storyController.getAll);
router.post("/stories", auth, storyController.create);
router.post("/stories/video", upload.single("video"), storyController.create);
router.get("/trending", auth, storyController.getTrending);
router.get("/stories/:id", auth, storyController.getById);
router.delete("/stories/:id", auth, storyController.deleteById);
router.post("/comment", auth, commentController.createComment);
router.get("/comments/:id", auth, commentController.getCommentsByPostId);
router.post("/upvote", auth, votesController.upVote);
router.post("/downvote", auth, votesController.downVote);
router.get("/engagements/:id", auth, engagementController.getEngagements);
router.get("/leaderboard", auth, leaderboardController.getLeaderboard);
router.post("/vote-status", auth, votesController.getVoteStatus);
router.get("/num-users", auth, userController.getNumUsers);
router.put("/stories", auth, storyController.update);

// single('video') -> html will have a field named video

// [] todo fix this i mean refactor this after it works

export default router;
