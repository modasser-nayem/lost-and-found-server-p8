/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from "jsonwebtoken";
import { TReportLostItem } from "./lostItem.interface";
import { prisma } from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { pagination } from "../../utils/pagination";
import { TMeta, TPaginationQuery } from "../../interface/pagination";

const reportLostItem = async (payload: {
  user: JwtPayload;
  data: TReportLostItem;
}) => {
  payload.data.userId = payload.user.id;

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

const getMyLostItems = async (payload: {
  user: JwtPayload;
  query: { pagination: TPaginationQuery };
}) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(
    payload.query.pagination,
  );

  const result = await prisma.lostItem.findMany({
    where: {
      userId: payload.user.id,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: skip,
    take: limit,
    select: {
      id: true,
      title: true,
      category: true,
      brand: true,
      lostDate: true,
      lostLocation: true,
      isFound: true,
      foundAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const meta: TMeta = {
    page,
    limit,
    total: result.length,
  };

  return { data: result, meta: meta };
};

const getAllLostItems = async (payload: {
  query: { pagination: TPaginationQuery };
}) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(
    payload.query.pagination,
  );
  const result = await prisma.lostItem.findMany({
    where: {
      isFound: false,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: skip,
    take: limit,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      lostDate: true,
      lostLocation: true,
      createdAt: true,
    },
  });

  const meta: TMeta = {
    page,
    limit,
    total: result.length,
  };

  return { data: result, meta: meta };
};

const getSingleLostItem = async (payload: { lostItemId: string }) => {
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

const markAsFoundLostItem = async (payload: {
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

  await prisma.lostItem.update({
    where: {
      id: result.id,
    },
    data: {
      isFound: result.isFound === false ? true : false,
      foundAt: result.isFound === false ? new Date().toISOString() : null,
    },
  });

  return null;
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

  if (result.isFound) {
    throw new AppError(400, "Found item can't be deleted");
  }

  await prisma.lostItem.delete({ where: { id: result.id } });

  return null;
};

const lostItemServices = {
  reportLostItem,
  getMyLostItems,
  getAllLostItems,
  getSingleLostItem,
  updateLostItem,
  markAsFoundLostItem,
  deleteLostItem,
};
export default lostItemServices;
