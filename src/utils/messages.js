import {
  success,
  internalServerError
} from "./responseCode.js";
import { RESPONSE_CODE } from "../config/constants/responseCode.js";

export const successResponse = (data, res) => {
  return res.status(success).json({
    code: RESPONSE_CODE.DEFAULT,
    message: res.message,
    data: data,
  });
};

export const internalServerErrorResponse = (res) => {
  return res.status(internalServerError).json({
    code: RESPONSE_CODE.ERROR,
    message: res.message,
    data: {},
  });
};



