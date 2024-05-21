import { ErrorRequestHandler } from "express";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  const errorDetails = err;

  res.status(statusCode).json({
    success: false,
    message: message,
    errorDetails: errorDetails,
  });
};

export default globalErrorHandler;
