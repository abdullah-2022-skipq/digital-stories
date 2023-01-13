class PostCommentsDTO {
  text;

  username;

  avatarPath;

  postedAt;

  _id;

  constructor(comment) {
    this.text = comment.text;
    this.username = comment.user.username;
    this.avatarPath = comment.user.avatarPath;
    this.postedAt = comment.createdAt;
    this._id = comment._id;
  }
}

export default PostCommentsDTO;
