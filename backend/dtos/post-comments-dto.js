class PostCommentsDTO {
  constructor(comment) {
    this.text = comment.text;
    this.username =
      comment.user === null ? "Deleted User" : comment.user.username;
    this.avatarPath =
      comment.user === null
        ? "http://localhost:5544/storage/user-not-found.png"
        : comment.user.avatarPath;
    this.postedAt = comment.createdAt;
    this._id = comment._id;
  }
}

// <a target="_blank" href="https://icons8.com/icon/hBjfSNdIeQ6e/user-not-found">User Not Found</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

export default PostCommentsDTO;
