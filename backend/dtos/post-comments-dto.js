export class PostCommentsDTO {
  text;
  username;
  avatarPath;
  postedAt;

  constructor(comment) {
    this.text = comment.text;
    this.username = comment.user.username;
    this.avatarPath = comment.user.avatarPath;
    this.postedAt = comment.createdAt;
  }
}
