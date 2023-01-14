class LeaderboardDTO {
  constructor(user) {
    this.username = user.postedBy.username;
    this.avatar = user.postedBy.avatarPath;
    this.storyCount = user.storiesPosted;
    this.upVoteCount = user.upVoteCount;
  }
}

export default LeaderboardDTO;
