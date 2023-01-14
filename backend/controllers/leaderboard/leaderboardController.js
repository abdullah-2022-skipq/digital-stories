import LeaderboardDTO from "../../dtos/leaderboard-dto";
import { Story } from "../../models";

const leaderboardController = {
  async getLeaderboard(req, res, next) {
    Story.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      {
        $addFields: {
          postedBy: { $arrayElemAt: ["$postedBy", 0] },
        },
      },
      {
        $group: {
          _id: "$postedBy._id",
          upVoteCount: { $sum: "$upVoteCount" },
          storiesPosted: { $sum: 1 },
          postedBy: { $first: "$postedBy" },
        },
      },
    ])
      .sort({ storiesPosted: -1, upVoteCount: -1 })
      .exec((err, result) => {
        if (err) {
          return next(err);
        }

        const leaderboardDto = [];

        for (let i = 0; i < result.length; i += 1) {
          const obj = new LeaderboardDTO(result[i]);
          leaderboardDto.push(obj);
        }
        return res.status(200).json({ leaderboard: leaderboardDto });
      });
  },
};

export default leaderboardController;
