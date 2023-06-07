import dotenv from "dotenv";

import Contact from "../models/contact";

import { sendContact } from "../middleware/sendMail";

import { contactSchema } from "../validate/contact";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    // Lấy danh sách dữ liệu từ cơ sở dữ liệu
    const data = await Contact.find();

    // Kiểm tra xem có dữ liệu nào không
    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về danh sách dữ liệu và thông báo thành công
    return res.status(200).json({
      message: "Danh sách phản hồi",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy danh sách
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách phản hồi",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    // Tìm kiếm một phản hồi dựa trên id được cung cấp
    const data = await Contact.findById(req.params.id);

    // Kiểm tra xem có dữ liệu nào không
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy phản hồi",
      });
    }

    // Trả về thông tin phản hồi và thông báo thành công
    return res.status(200).json({
      message: "Thông tin phản hồi",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy thông tin
    return res.status(500).json({
      message: "Lỗi khi lấy thông tin phản hồi",
    });
  }
};

const create = async (req, res) => {
  try {
    // Validate dữ liệu liên hệ
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Nếu có lỗi validate, trả về danh sách lỗi cho client
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Tạo mới liên hệ
    const contact = await Contact.create(req.body);

    // Gửi email
    sendContact(req.body);

    // Trả về thông báo cho client khi thành công và thông tin liên hệ đã được tạo mới
    return res.status(201).json({
      message: "Phản hồi thành công",
      contact,
    });
  } catch (err) {
    console.error(err);

    // Thông báo cho client khi có lỗi xảy ra
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi tạo phản hồi",
    });
  }
};

export { create };
