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
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved my lost items",
    data: result,
  });
});

const getAllLostItems = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.getAllLostItems();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all lost items",
    data: result,
  });
});

const getSingleLostItems = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.getSingleLostItems({
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

const deleteLostItem = catchAsyncHandler(async (req, res) => {
  const result = await lostItemServices.deleteLostItem(req.body);

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
  deleteLostItem,
};
export default lostItemControllers;
