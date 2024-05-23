import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import claimItemServices from "./claimItem.service";

const createClaimRequest = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.createClaimRequest({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully send claim request",
    data: result,
  });
});

const updateClaimRequest = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.updateClaimRequest({
    user: req.user,
    claimId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully update claim request",
    data: result,
  });
});

const updateClaimStatus = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.updateClaimStatus({
    user: req.user,
    claimId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully update claim status",
    data: result,
  });
});

const getMyClaimRequests = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.getMyClaimRequests({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved claim requests",
    data: result,
  });
});

const getSingleClaimRequest = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.getSingleClaimRequest({
    claimId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved claim request",
    data: result,
  });
});

const getClaimRequestsByFoundItemId = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.getClaimRequestsByFoundItemId({
    user: req.user,
    foundItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved claim requests",
    data: result,
  });
});

const deleteClaimRequest = catchAsyncHandler(async (req, res) => {
  const result = await claimItemServices.deleteClaimRequest({
    user: req.user,
    claimId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Claim Request",
    data: result,
  });
});

const claimItemControllers = {
  createClaimRequest,
  updateClaimRequest,
  updateClaimStatus,
  getMyClaimRequests,
  getSingleClaimRequest,
  getClaimRequestsByFoundItemId,
  deleteClaimRequest,
};
export default claimItemControllers;
