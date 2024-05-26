/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from "jsonwebtoken";
import { TReportLostItem } from "./lostItem.interface";
import { prisma } from "../../utils/prisma";
import AppError from "../../errors/AppError";

const reportLostItem = async (payload: {
  user: JwtPayload;
  data: TReportLostItem;
}) => {
  payload.data.userId = payload.user.id;

  console.log(payload.data);

  const result = await prisma.lostItem.create({
    data: payload.data,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      lostDate: true,
      lostLocation: true,
      createdAt: true,
      username: true,
      email: true,
      phone: true,
    },
  });

  return result;
};

const getMyLostItems = async (payload: { user: JwtPayload }) => {
  const result = await prisma.lostItem.findMany({
    where: {
      userId: payload.user.id,
    },
    select: {
      id: true,
      title: true,
      category: true,
      brand: true,
      images: true,
      lostDate: true,
      lostLocation: true,
      isFound: true,
      foundAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getAllLostItems = async () => {
  const result = await prisma.lostItem.findMany({
    // where: {
    //   isFound: false,
    // },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      isFound: true,
      images: true,
      lostDate: true,
      lostLocation: true,
      createdAt: true,
    },
  });

  return result;
};

const getSingleLostItems = async (payload: { lostItemId: string }) => {
  const result = await prisma.lostItem.findUnique({
    where: {
      id: payload.lostItemId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      lostDate: true,
      lostLocation: true,
      foundAt: true,
      isFound: true,
      username: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new AppError(404, "Lost item not found!");
  }

  return result;
};

const updateLostItem = async (payload: {
  user: JwtPayload;
  lostItemId: string;
  data: Partial<TReportLostItem>;
}) => {
  const lostItem = await prisma.lostItem.findUnique({
    where: {
      id: payload.lostItemId,
      userId: payload.user.id,
    },
  });

  if (!lostItem) {
    throw new AppError(404, "Item not found!");
  }

  const result = await prisma.lostItem.update({
    where: {
      id: lostItem.id,
    },
    data: { ...payload.data, updatedAt: new Date().toISOString() },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      lostDate: true,
      lostLocation: true,
      username: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteLostItem = async (payload: {
  user: JwtPayload;
  lostItemId: string;
}) => {
  const result = await prisma.lostItem.findUnique({
    where: {
      id: payload.lostItemId,
      userId: payload.user.id,
    },
  });

  if (!result) {
    throw new AppError(404, "Item not found!");
  }

  return null;
};

const lostItemServices = {
  reportLostItem,
  getMyLostItems,
  getAllLostItems,
  getSingleLostItems,
  updateLostItem,
  deleteLostItem,
};
export default lostItemServices;
