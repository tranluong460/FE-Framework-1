import joi from "joi";
import { errorMessages } from "./component/function";

export const paymentSchema = joi.object({
  orderId: joi.string().optional(),
  cardHolderName: joi
    .string()
    .required()
    .messages(errorMessages("Chủ tài khoản")),
  cardNumber: joi.number().required().messages(errorMessages("Số thẻ")),
  expirationDate: joi
    .string()
    .required()
    .messages(errorMessages("Ngày hết hạn")),
  cvv: joi.number().required().messages(errorMessages("cvv")),
});
