import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import reportServices from "./reports.service";

const totalItemCountReport = catchAsyncHandler(async (req, res) => {
  const result = await reportServices.totalItemCountReport();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Total item count report",
    data: result,
  });
});

const reportControllers = { totalItemCountReport };
export default reportControllers;
