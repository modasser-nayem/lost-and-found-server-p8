import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "../errors/zodErrorHandler";
import AppError from "../errors/AppError";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  if (err instanceof ZodError) {
    const result = zodErrorHandler(err);
    statusCode = result.statusCode;
    message = result.message;
    errorDetails = result.errors;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = null;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorDetails: errorDetails,
  });
};

export default globalErrorHandler;
