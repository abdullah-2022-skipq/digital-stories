import { Story } from "../../models";

const leaderboardController = {
  async getLeaderboard(req, res, next) {
    Story.aggregate([
      {
        $group: {
          _id: "$postedBy",
          upVoteCount: { $sum: "$upVoteCount" },
          storiesPosted: { $sum: 1 },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ leaderboard: result });
    });
  },
};

export default leaderboardController;
