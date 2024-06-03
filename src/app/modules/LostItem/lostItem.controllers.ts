import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import lostItemServices from "./lostItem.service";

const reportLostItem = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.reportLostItem({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully report for lost item",
    data: result,
  });
});

const getMyLostItems = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.getMyLostItems({
    user: req.user,
    query: {
      pagination: req.query,
    },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved my lost items",
    meta: result.meta,
    data: result.data,
  });
});

const getAllLostItems = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.getAllLostItems({
    query: {
      pagination: req.query,
    },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all lost items",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleLostItems = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.getSingleLostItem({
    lostItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved lost item",
    data: result,
  });
});

const updateLostItem = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.updateLostItem({
    user: req.user,
    lostItemId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lost item successfully updated",
    data: result,
  });
});

const markAsFoundLostItem = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.markAsFoundLostItem({
    user: req.user,
    lostItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update found status",
    data: result,
  });
});

const deleteLostItem = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.deleteLostItem({
    user: req.user,
    lostItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lost item successfully deleted",
    data: result,
  });
});

const lostItemControllers = {
  reportLostItem,
  getMyLostItems,
  getAllLostItems,
  getSingleLostItems,
  updateLostItem,
  markAsFoundLostItem,
  deleteLostItem,
};
export default lostItemControllers;
