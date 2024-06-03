import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import foundItemServices from "./foundItem.service";

const reportFoundItem = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.reportFoundItem({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully report for found item",
    data: result,
  });
});

const getMyFoundItems = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.getMyFoundItems({
    user: req.user,
    query: {
      pagination: req.query,
    },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved my found items",
    data: result.data,
    meta: result.meta,
  });
});

const getMySingleFoundItem = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.getMySingleFoundItem({
    foundItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved found item",
    data: result,
  });
});

const getAllFoundItems = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.getAllFoundItems({
    query: {
      pagination: req.query,
    },
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all found items",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFoundItems = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.getSingleFoundItems({
    foundItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved found item",
    data: result,
  });
});

const updateFoundItem = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.updateFoundItem({
    user: req.user,
    foundItemId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Found item successfully updated",
    data: result,
  });
});

const deleteFoundItem = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.deleteFoundItem({
    user: req.user,
    foundItemId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Found item successfully deleted",
    data: result,
  });
});

const foundItemControllers = {
  reportFoundItem,
  getMyFoundItems,
  getMySingleFoundItem,
  getAllFoundItems,
  getSingleFoundItems,
  updateFoundItem,
  deleteFoundItem,
};
export default foundItemControllers;
