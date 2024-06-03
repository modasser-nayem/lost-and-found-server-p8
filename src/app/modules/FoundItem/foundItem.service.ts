/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from "jsonwebtoken";
import { TReportFoundItem } from "./foundItem.interface";
import { prisma } from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { pagination } from "../../utils/pagination";
import { TMeta, TPaginationQuery } from "../../interface/pagination";

const reportFoundItem = async (payload: {
  user: JwtPayload;
  data: TReportFoundItem;
}) => {
  payload.data.userId = payload.user.id;

  const result = await prisma.foundItem.create({
    data: payload.data,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      foundDate: true,
      foundLocation: true,
      createdAt: true,
      username: true,
      email: true,
      phone: true,
    },
  });

  return result;
};

const getMyFoundItems = async (payload: {
  user: JwtPayload;
  query: { pagination: TPaginationQuery };
}) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(
    payload.query.pagination,
  );

  const result = await prisma.foundItem.findMany({
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
      foundDate: true,
      foundLocation: true,
      createdAt: true,
      giveToOwner: true,
      _count: { select: { claimItems: true } },
    },
  });

  const meta: TMeta = {
    page,
    limit,
    total: result.length,
  };

  return { data: result, meta: meta };
};

const getMySingleFoundItem = async (payload: { foundItemId: string }) => {
  const result = await prisma.foundItem.findUnique({
    where: {
      id: payload.foundItemId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      foundDate: true,
      foundLocation: true,
      giveToOwner: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { claimItems: true },
      },
    },
  });

  if (!result) {
    throw new AppError(404, "Found item not found!");
  }

  return result;
};

const getAllFoundItems = async (payload: {
  query: { pagination: TPaginationQuery };
}) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(
    payload.query.pagination,
  );

  const result = await prisma.foundItem.findMany({
    where: {
      giveToOwner: false,
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
      foundDate: true,
      foundLocation: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          photoURL: true,
        },
      },
      _count: {
        select: { claimItems: true },
      },
    },
  });

  const meta: TMeta = {
    page,
    limit,
    total: result.length,
  };

  return { data: result, meta: meta };
};

const getSingleFoundItems = async (payload: { foundItemId: string }) => {
  const result = await prisma.foundItem.findUnique({
    where: {
      id: payload.foundItemId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      foundDate: true,
      foundLocation: true,
      username: true,
      email: true,
      phone: true,
      createdAt: true,
      _count: {
        select: { claimItems: true },
      },
    },
  });

  if (!result) {
    throw new AppError(404, "Found item not found!");
  }

  return result;
};

const updateFoundItem = async (payload: {
  user: JwtPayload;
  foundItemId: string;
  data: Partial<TReportFoundItem>;
}) => {
  const foundItem = await prisma.foundItem.findUnique({
    where: {
      id: payload.foundItemId,
      userId: payload.user.id,
    },
  });

  if (!foundItem) {
    throw new AppError(404, "Item not found!");
  }

  const result = await prisma.foundItem.update({
    where: {
      id: foundItem.id,
    },
    data: { ...payload.data, updatedAt: new Date().toISOString() },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      images: true,
      foundDate: true,
      foundLocation: true,
      username: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteFoundItem = async (payload: {
  user: JwtPayload;
  foundItemId: string;
}) => {
  const foundItem = await prisma.foundItem.findUnique({
    where: {
      id: payload.foundItemId,
      userId: payload.user.id,
    },
  });

  if (!foundItem) {
    throw new AppError(404, "Item not found!");
  }

  await prisma.$transaction(async (trans) => {
    const deleteResult = await trans.foundItem.delete({
      where: { id: foundItem.id },
    });

    await trans.claimItem.deleteMany({
      where: {
        itemId: deleteResult.id,
      },
    });

    return null;
  });

  return null;
};

const foundItemServices = {
  reportFoundItem,
  getMyFoundItems,
  getMySingleFoundItem,
  getAllFoundItems,
  getSingleFoundItems,
  updateFoundItem,
  deleteFoundItem,
};
export default foundItemServices;
