class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userAlreadyExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Email or password is wrong!") {
    return new CustomErrorHandler(401, message);
  }
}

export default CustomErrorHandler;
