import express from 'express';
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
} from '../controllers';

import { auth } from '../middlewares';
import upload from '../middlewares/video';

const router = express.Router();

// auth
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/refresh', refreshController.refresh);
router.post('/logout', auth, logoutController.logout);

// user
router.get('/me', auth, userController.myDetails);
router.get('/num-users', auth, userController.getNumUsers);

// stories
router.get('/stories', auth, storyController.getAll);
router.post('/stories', auth, storyController.create);
router.post(
  '/stories/video',
  auth,
  upload.single('video'),
  storyController.create
);
router.get('/trending', auth, storyController.getTrending);
router.get('/stories/:id', auth, storyController.getById);
router.delete('/stories/:id', auth, storyController.deleteById);
router.put('/stories', auth, storyController.update);
router.put(
  '/stories/video',
  auth,
  upload.single('video'),
  storyController.update
);

// comments
router.post('/comment', auth, commentController.createComment);
router.get('/comments/:id', auth, commentController.getCommentsByPostId);

// votes
router.post('/upvote', auth, votesController.upVote);
router.post('/downvote', auth, votesController.downVote);
router.post('/vote-status', auth, votesController.getVoteStatus);

// engagements
router.get('/engagements/:id', auth, engagementController.getEngagements);

// leaderboard
router.get('/leaderboard', auth, leaderboardController.getLeaderboard);

// single('video') -> html will have a field named video

export default router;
