class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userAlreadyExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Username or password is wrong!") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "Unauthorized") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "Not found") {
    return new CustomErrorHandler(404, message);
  }

  static failedImageProcessing(message) {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
