class EngagementDTO {
  constructor(engagement) {
    // eslint-disable-next-line no-nested-ternary
    this.action =
      engagement.action === "comment"
        ? "commented"
        : engagement.action === "upvote"
        ? "upvoted"
        : "downvoted";
    this.username = engagement.byUser ? engagement.byUser.username : null;
    this.onStory = engagement.onPost ? engagement.onPost._id : null;
    this.date = engagement.createdAt;
    this.key = engagement._id;
    this.goal = engagement.forUser ? engagement.forUser.username : null;
  }
}

export default EngagementDTO;
