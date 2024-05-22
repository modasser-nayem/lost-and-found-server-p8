import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { UserRole } from "@prisma/client";

export type TJwtPayload = {
  id: string;
  role: UserRole;
};

const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AppError(401, "You are not authorized!");
  }
};

const jwtHelper = { generateToken, verifyToken };
export default jwtHelper;
