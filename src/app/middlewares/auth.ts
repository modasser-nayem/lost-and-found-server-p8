import config from "../../config";
import AppError from "../errors/AppError";
import jwtHelper from "../helpers/jwtHelper";
import catchAsyncHandler from "../utils/catchAsyncHandler";
import { prisma } from "../utils/prisma";

const auth = () => {
  return catchAsyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    const decodeUser = jwtHelper.verifyToken(
      token,
      config.JWT_ACCESS_SECRET as string,
    );

    const user = await prisma.user.findUnique({
      where: {
        id: decodeUser.id,
      },
    });

    if (!user) {
      throw new AppError(401, "You are not authorized!");
    }

    req.user = decodeUser;

    next();
  });
};

export default auth;
