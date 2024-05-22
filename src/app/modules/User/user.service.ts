import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { prisma } from "../../utils/prisma";
import {
  TUpdateUserProfile,
  TUpdateUserRole,
  TUpdateUserStatus,
} from "./user.interface";

const getMyProfile = async (payload: { user: JwtPayload }) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.user.id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      phone: true,
      photoURL: true,
      passwordChangeAt: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
  });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = async (payload: {
  queryParams?: Record<string, unknown>;
}) => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      phone: true,
      photoURL: true,
      createdAt: true,
      status: true,
    },
  });

  return result;
};

const getSingleUser = async (payload: { userId: string }) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.userId,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      phone: true,
      photoURL: true,
      createdAt: true,
      status: true,
    },
  });

  if (!result) {
    throw new AppError(404, "User not found!");
  }

  return result;
};

const updateMyProfile = async (payload: {
  user: JwtPayload;
  data: TUpdateUserProfile;
}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.user.id,
    },
  });

  if (!user) {
    throw new AppError(404, "Account not found!");
  }

  if (
    await prisma.user.findFirst({ where: { username: payload.data.username } })
  ) {
    throw new AppError(400, "username already exist");
  }

  if (await prisma.user.findFirst({ where: { email: payload.data.email } })) {
    throw new AppError(400, "email already exist");
  }

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: { ...payload.data, updatedAt: new Date().toISOString() },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      phone: true,
      photoURL: true,
      passwordChangeAt: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
  });

  return result;
};

const updateUserRole = async (payload: {
  user: JwtPayload;
  data: TUpdateUserRole;
}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.data.userId,
    },
  });

  if (!user) {
    throw new AppError(404, "Account not found!");
  }

  if (user.id === payload.user.id) {
    throw new AppError(400, "You cant't update own role");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: payload.data.role,
    },
  });

  return null;
};

const updateUserAccountStatus = async (payload: {
  user: JwtPayload;
  data: TUpdateUserStatus;
}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.data.userId,
    },
  });

  if (!user) {
    throw new AppError(404, "Account not found!");
  }

  if (user.id === payload.user.id) {
    throw new AppError(400, "You cant't update own status");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      status: payload.data.status,
    },
  });

  return null;
};

const deleteUser = async (payload: { userId: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    throw new AppError(404, "Account not found!");
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  return null;
};

const userServices = {
  getMyProfile,
  getAllUsers,
  getSingleUser,
  updateMyProfile,
  updateUserRole,
  updateUserAccountStatus,
  deleteUser,
};
export default userServices;
