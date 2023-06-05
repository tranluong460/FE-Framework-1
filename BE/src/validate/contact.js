import joi from "joi";
import { errorMessages } from "./component/function";

export const contactSchema = joi.object({
  name: joi.string().required().messages(errorMessages("Tên")),
  email: joi.string().email().required().messages(errorMessages("Email")),
  phone: joi.string().required().messages(errorMessages("Số điện thoại")),
  address: joi.string().required().messages(errorMessages("Địa chỉ")),
  content: joi.string().required().messages(errorMessages("Phản hồi")),
});
