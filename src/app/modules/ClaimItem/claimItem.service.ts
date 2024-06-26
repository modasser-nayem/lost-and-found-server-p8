import { JwtPayload } from "jsonwebtoken";
import { TClaimRequest } from "./claimItem.interface";
import { prisma } from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { ClaimStatus } from "@prisma/client";
import { TMeta, TPaginationQuery } from "../../interface/pagination";
import { pagination } from "../../utils/pagination";

const createClaimRequest = async (payload: {
  user: JwtPayload;
  data: TClaimRequest;
}) => {
  payload.data.userId = payload.user.id;

  const foundItem = await prisma.foundItem.findUnique({
    where: { id: payload.data.itemId },
  });

  if (!foundItem) {
    throw new AppError(404, "Item not found!");
  }

  if (foundItem.userId === payload.user.id) {
    throw new AppError(400, "You can't claim own found item");
  }

  if (foundItem.giveToOwner) {
    throw new AppError(400, "Owner claim his product");
  }

  const result = await prisma.claimItem.create({
    data: payload.data,
    select: {
      id: true,
      description: true,
      productInvoice: true,
      images: true,
      status: true,
      itemId: true,
      createdAt: true,
    },
  });

  return result;
};

const updateClaimRequest = async (payload: {
  user: JwtPayload;
  claimId: string;
  data: Partial<TClaimRequest>;
}) => {
  const claimRequest = await prisma.claimItem.findUnique({
    where: {
      id: payload.claimId,
      userId: payload.user.id,
    },
  });

  if (!claimRequest) {
    throw new AppError(404, "Claim request not found");
  }

  if (claimRequest.status !== "pending") {
    throw new AppError(
      400,
      `Sorry, request is ${claimRequest.status}. It is not updatable`,
    );
  }

  const result = await prisma.claimItem.update({
    where: {
      id: claimRequest.id,
    },
    data: { ...payload.data, updatedAt: new Date().toISOString() },
    select: {
      id: true,
      description: true,
      productInvoice: true,
      images: true,
      status: true,
      itemId: true,
      createdAt: true,
    },
  });

  return result;
};

const updateClaimStatus = async (payload: {
  user: JwtPayload;
  claimId: string;
  data: { status: ClaimStatus };
}) => {
  const claimRequest = await prisma.claimItem.findUnique({
    where: {
      id: payload.claimId,
    },
    include: {
      item: true,
    },
  });

  if (!claimRequest) {
    throw new AppError(404, "Claim request not found");
  }

  if (claimRequest.item.userId !== payload.user.id) {
    throw new AppError(403, "You have no permission for this route");
  }

  await prisma.$transaction(async (trans) => {
    const updateResult = await trans.claimItem.update({
      where: {
        id: claimRequest.id,
      },
      data: { ...payload.data, statusUpdateAt: new Date().toISOString() },
    });

    await prisma.foundItem.update({
      where: {
        id: claimRequest.itemId,
      },
      data: {
        giveToOwner: updateResult.status === "approved" ? true : false,
      },
    });
  });

  return null;
};

const getMyClaimRequests = async (payload: {
  user: JwtPayload;
  query: { pagination: TPaginationQuery };
}) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(
    payload.query.pagination,
  );

  const result = await prisma.claimItem.findMany({
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
      createdAt: true,
      status: true,
      statusUpdateAt: true,
      item: {
        select: {
          id: true,
          title: true,
          foundDate: true,
          foundLocation: true,
        },
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

const getSingleClaimRequest = async (payload: { claimId: string }) => {
  const claimRequest = await prisma.claimItem.findUnique({
    where: {
      id: payload.claimId,
    },
    select: {
      id: true,
      description: true,
      productInvoice: true,
      images: true,
      status: true,
      statusUpdateAt: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          photoURL: true,
        },
      },
      item: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (!claimRequest) {
    throw new AppError(404, "Claim request not found");
  }

  return claimRequest;
};

const getClaimRequestsByFoundItemId = async (payload: {
  user: JwtPayload;
  foundItemId: string;
}) => {
  const result = await prisma.claimItem.findMany({
    where: {
      itemId: payload.foundItemId,
      item: {
        userId: payload.user.id,
      },
    },
    select: {
      id: true,
      description: true,
      status: true,
      statusUpdateAt: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          photoURL: true,
        },
      },
    },
  });

  return result;
};

const deleteClaimRequest = async (payload: {
  user: JwtPayload;
  claimId: string;
}) => {
  const claimRequest = await prisma.claimItem.findUnique({
    where: {
      id: payload.claimId,
    },
  });

  if (!claimRequest) {
    throw new AppError(404, "Claim request not found");
  }

  if (claimRequest.userId !== payload.user.id) {
    throw new AppError(403, "You have no permission for this route");
  }

  await prisma.claimItem.delete({
    where: {
      id: claimRequest.id,
    },
  });

  return null;
};

const claimItemServices = {
  createClaimRequest,
  updateClaimRequest,
  updateClaimStatus,
  getMyClaimRequests,
  getSingleClaimRequest,
  getClaimRequestsByFoundItemId,
  deleteClaimRequest,
};
export default claimItemServices;
