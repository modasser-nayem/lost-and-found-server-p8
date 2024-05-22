import { Response } from "express";

type TSendResponseDataProps = {
  statusCode: number;
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
};
const sendResponse = (res: Response, data: TSendResponseDataProps) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
