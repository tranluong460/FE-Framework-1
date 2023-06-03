import joi from "joi";
import { errorMessages } from "./component/function";

export const registerSchema = joi.object({
  name: joi.string().required().messages(errorMessages("Tên")),
  email: joi.string().email().required().messages(errorMessages("Email")),
  phone: joi.string().required().messages(errorMessages("Số điện thoại")),
  address: joi.string().required().messages(errorMessages("Địa chỉ")),
  password: joi.string().required().min(6).messages(errorMessages("Mật khẩu")),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .messages(errorMessages("Xác nhận mật khẩu")),
});
