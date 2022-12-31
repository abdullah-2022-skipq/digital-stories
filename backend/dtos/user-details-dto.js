export class UserDetailsDTO {
  id_;
  name;
  username;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.username = user.username;
    this.memberSince = this.getmemberSince(user.createdAt);
  }

  getmemberSince(creationDate) {
    const currentTime = Date.now();
    const timeDifference = currentTime - creationDate.getTime();
    // Convert the time difference from milliseconds to seconds
    const seconds = Math.round(timeDifference / 1000);

    // Convert the time difference from seconds to minutes
    const minutes = Math.round(seconds / 60);

    // Convert the time difference from minutes to hours
    const hours = Math.round(minutes / 60);

    // Convert the time difference from hours to days
    const days = Math.round(hours / 24);

    // Convert the time difference from days to weeks
    const weeks = Math.round(days / 7);

    // Convert the time difference from weeks to months
    const months = Math.round(weeks / 4.35);

    // Convert the time difference from months to years
    const years = Math.round(months / 12);

    if (years != 0) {
      return `${years} years`;
    } else if (months != 0) {
      return `${months} months`;
    } else if (weeks != 0) {
      return `${weeks} weeks`;
    } else if (days != 0) {
      return `${days} days`;
    } else if (hours != 0) {
      return `${hours} hours`;
    } else if (minutes != 0) {
      return `${minutes} minutes`;
    } else {
      return `${seconds} seconds`;
    }
  }
}
