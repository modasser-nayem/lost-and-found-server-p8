import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";

const getMyProfile = catchAsyncHandler(async (req, res) => {
  const result = await userServices.getMyProfile({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile successfully retrieved ",
    data: result,
  });
});

const getAllUsers = catchAsyncHandler(async (req, res) => {
  const result = await userServices.getAllUsers({});

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All users are successfully retrieved",
    data: result,
  });
});

const getSingleUser = catchAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const result = await userServices.getSingleUser({ userId });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single user successfully retrieved",
    data: result,
  });
});

const updateMyProfile = catchAsyncHandler(async (req, res) => {
  const result = await userServices.updateMyProfile({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile successfully updated",
    data: result,
  });
});

const updateUserRole = catchAsyncHandler(async (req, res) => {
  const result = await userServices.updateUserRole({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role successfully updated",
    data: result,
  });
});

const updateUserAccountStatus = catchAsyncHandler(async (req, res) => {
  const result = await userServices.updateUserAccountStatus({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User status successfully updated",
    data: result,
  });
});

const deleteUser = catchAsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await userServices.deleteUser({ userId });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account successfully deleted",
    data: result,
  });
});

const userControllers = {
  getMyProfile,
  getAllUsers,
  getSingleUser,
  updateMyProfile,
  updateUserRole,
  updateUserAccountStatus,
  deleteUser,
};
export default userControllers;
