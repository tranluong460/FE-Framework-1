import dotenv from "dotenv";

import Contact from "../models/contact";

import { sendContact } from "../middleware/sendMail";

import { contactSchema } from "../validate/contact";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    const data = await Contact.find();

    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Danh sách phản hồi",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi lấy danh sách phản hồi",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await Contact.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy phản hồi",
      });
    }

    return res.status(200).json({
      message: "Thông tin phản hồi",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi lấy thông tin phản hồi",
    });
  }
};

const create = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const contact = await Contact.create(req.body);

    sendContact(req.body);

    return res.status(201).json({
      message: "Phản hồi thành công",
      contact,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi tạo phản hồi",
    });
  }
};

export { create };
