import { ZodError } from "zod";

const zodErrorHandler = (err: ZodError) => {
  const message = err.issues[0].message;
  const errors = err.issues.map((issue) => ({
    field: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  return {
    statusCode: 400,
    message: message,
    errors: errors,
  };
};

export default zodErrorHandler;
