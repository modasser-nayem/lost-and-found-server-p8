import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../errors/AppError";
import jwtHelper from "../../helpers/jwtHelper";
import { prisma } from "../../utils/prisma";
import { TChangePassword, TLoginUser, TRegisterUser } from "./auth.interface";
import bcrypt from "bcrypt";

const registerUser = async (payload: TRegisterUser) => {
  if (await prisma.user.findFirst({ where: { username: payload.username } })) {
    throw new AppError(400, "username already exist");
  }

  if (await prisma.user.findFirst({ where: { email: payload.email } })) {
    throw new AppError(400, "email already exist");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  payload.password = hashedPassword;

  const result = await prisma.user.create({
    data: payload,
  });

  const jwtPayload = {
    id: result.id,
    role: result.role,
  };

  const token = jwtHelper.generateToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRESIN as string,
  );

  return { access_token: token };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  if (!(await bcrypt.compare(payload.password, user.password))) {
    throw new AppError(400, "Password is wrong!");
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const token = jwtHelper.generateToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRESIN as string,
  );

  const result = {
    access_token: token,
  };

  return result;
};

const changePassword = async (payload: {
  user: JwtPayload;
  data: TChangePassword;
}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.user.id,
    },
  });

  if (!(await bcrypt.compare(payload.data.currentPassword, user.password))) {
    throw new AppError(400, "Current Password is wrong!");
  }

  const hashedPassword = await bcrypt.hash(
    payload.data.newPassword,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      passwordChangeAt: new Date().toISOString(),
    },
  });

  return null;
};

const authServices = { registerUser, loginUser, changePassword };
export default authServices;
