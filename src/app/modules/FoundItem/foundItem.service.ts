/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from "jsonwebtoken";
import { TReportFoundItem } from "./foundItem.interface";
import { prisma } from "../../utils/prisma";

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

const getMyFoundItems = async (payload: { user: JwtPayload }) => {
  const result = await prisma.foundItem.findMany({
    where: {
      userId: payload.user.id,
    },
    select: {
      id: true,
      title: true,
      category: true,
      brand: true,
      images: true,
      foundDate: true,
      foundLocation: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  return result;
};

const getAllFoundItems = async (payload: any) => {
  return payload;
};

const getSingleFoundItems = async (payload: any) => {
  return payload;
};

const updateFoundItem = async (payload: any) => {
  return payload;
};

const deleteFoundItem = async (payload: any) => {
  return payload;
};

const foundItemServices = {
  reportFoundItem,
  getMyFoundItems,
  getAllFoundItems,
  getSingleFoundItems,
  updateFoundItem,
  deleteFoundItem,
};
export default foundItemServices;
