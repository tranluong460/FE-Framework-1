import Joi from "joi";

export const orderSchema = Joi.object({
  status: Joi.string().valid(
    "Chờ thanh toán",
    "Đang xử lý",
    "Đang giao hàng",
    "Đã giao hàng",
    "Đã hủy",
    "Đã hoàn tiền",
    "Đã hoàn thành"
  ),
}).options({ allowUnknown: true });
