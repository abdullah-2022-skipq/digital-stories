class CustomeErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userAlreadyExists(message) {
    return new CustomeErrorHandler(409, message);
  }
}

export default CustomeErrorHandler;
