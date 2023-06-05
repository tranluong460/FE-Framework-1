import joi from "joi";
import { errorMessages } from "./component/function";

export const productSchema = joi
  .object({
    name: joi.string().required().messages(errorMessages("Tên")),
    price: joi.number().min(1).required().messages(errorMessages("Giá")),
    original_price: joi
      .number()
      .min(1)
      .required()
      .messages(errorMessages("Giá gốc")),
    quantity: joi
      .number()
      .min(0)
      .required()
      .messages(errorMessages("Số lượng")),
    short_description: joi
      .string()
      .required()
      .messages(errorMessages("Mô tả ngắn")),
    description: joi.string().required().messages(errorMessages("Mô tả")),
    brand: joi.string().required().messages(errorMessages("Danh mục")),
    images: joi
      .array()
      .min(1)
      .required()
      .items(
        joi.object({
          _id: joi.string().optional(),
          base_url: joi.string().required().messages(errorMessages("Ảnh gốc")),
          is_gallery: joi.boolean().optional(),
          label: joi.string().allow(null).optional(),
          large_url: joi.string().optional(),
          medium_url: joi.string().optional(),
          position: joi.string().allow(null).optional(),
          small_url: joi.string().optional(),
          thumbnail_url: joi.string().optional(),
        })
      )
      .messages(errorMessages("Ảnh")),
    specifications: joi
      .array()
      .optional()
      .required()
      .items(
        joi.object({
          _id: joi.string().optional(),
          name: joi.string().required().messages(errorMessages("Tên thông số")),
          attributes: joi
            .array()
            .required()
            .items(
              joi.object({
                _id: joi.string().optional(),
                code: joi.string().required().messages(errorMessages("Code")),
                name: joi.string().required().messages(errorMessages("Name")),
                value: joi.string().required().messages(errorMessages("Value")),
              })
            )
            .messages(errorMessages("Thuộc tính")),
        })
      )
      .messages(errorMessages("Thông số")),
  })
  .unknown(true);
