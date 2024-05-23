import { JwtPayload } from "jsonwebtoken";
import { TClaimRequest } from "./claimItem.interface";

const createClaimRequest = async (payload: {
  user: JwtPayload;
  data: TClaimRequest;
}) => {
  return payload;
};

const updateClaimRequest = async (payload: {
  user: JwtPayload;
  claimId: string;
  data: Partial<TClaimRequest>;
}) => {
  return payload;
};

const updateClaimStatus = async (payload: {
  user: JwtPayload;
  claimId: string;
  data: { status: string };
}) => {
  return payload;
};

const getMyClaimRequests = async (payload: { user: JwtPayload }) => {
  return payload;
};

const getSingleClaimRequest = async (payload: { claimId: string }) => {
  return payload;
};

const getClaimRequestsByFoundItemId = async (payload: {
  user: JwtPayload;
  foundItemId: string;
}) => {
  return payload;
};

const deleteClaimRequest = async (payload: {
  user: JwtPayload;
  claimId: string;
}) => {
  return payload;
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
