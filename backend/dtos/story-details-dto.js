class StoryDetailsDTO {
  constructor(story) {
    this._id = story._id;
    this.caption = story.caption;
    this.font = story.font;
    this.fontColor = story.fontColor;
    this.mediaType = story.mediaType;
    this.image = story.image;
    this.video = story.video;
    this.avatarPath = story.postedBy.avatarPath;
    this.createdAt = story.createdAt;
    this.upVoteCount = story.upVoteCount;
    this.downVoteCount = story.downVoteCount;
    this.commentCount = story.commentCount;
    this.username = story.postedBy.username;
    this.postedBy = story.postedBy._id;
    this.isPrivate = story.isPrivate;
  }
}

export default StoryDetailsDTO;
