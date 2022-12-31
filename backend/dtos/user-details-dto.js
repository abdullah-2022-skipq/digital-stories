export class UserDetailsDTO {
  id_;
  name;
  username;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.username = user.username;
    this.memberSince = user.createdAt;
  }
}
