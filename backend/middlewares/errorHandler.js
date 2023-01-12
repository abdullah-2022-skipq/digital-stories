import { ValidationError } from 'joi';
import { DEBUG_MODE } from '../config';
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: 'Internal Server Error',
    ...(DEBUG_MODE === 'true' && { errorMessage: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  if (err.message === 'jwt expired') {
    statusCode = 401;
  }
  return res.status(statusCode).json(data);
};

export default errorHandler;
