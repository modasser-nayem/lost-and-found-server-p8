import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsyncHandler =
  (theFunc: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(theFunc(req, res, next)).catch((err) => next(err));

export default catchAsyncHandler;
