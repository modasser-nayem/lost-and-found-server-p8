import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import authServices from "./auth.service";

const registerUser = catchAsyncHandler(async (req, res) => {
  const result = await authServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsyncHandler(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsyncHandler(async (req, res) => {
  const result = await authServices.changePassword({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password successfully change",
    data: result,
  });
});

const authControllers = {
  registerUser,
  loginUser,
  changePassword,
};
export default authControllers;
