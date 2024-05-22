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
  const result = await foundItemServices.getMyFoundItems({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved my found items",
    data: result,
  });
});

const getAllFoundItems = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.getAllFoundItems(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all found items",
    data: result,
  });
});

const getSingleFoundItems = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.getSingleFoundItems(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved found item",
    data: result,
  });
});

const updateFoundItem = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.updateFoundItem(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Found item successfully updated",
    data: result,
  });
});

const deleteFoundItem = catchAsyncHandler(async (req, res) => {
  const result = await foundItemServices.deleteFoundItem(req.body);

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
  getAllFoundItems,
  getSingleFoundItems,
  updateFoundItem,
  deleteFoundItem,
};
export default foundItemControllers;
