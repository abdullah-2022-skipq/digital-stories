import { Story } from "../../models/";

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
    ]).exec(function (err, result) {
      if (err) {
        // handle error
      } else {
        console.log(result);
      }
    });

    console.log("and");
  },
};

export default leaderboardController;
