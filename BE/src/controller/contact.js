import dotenv from "dotenv";

import Contact from "../models/contact";

import { sendContact } from "../middleware/sendMail";

import { contactSchema } from "../validate/contact";

dotenv.config();

const create = async (req, res) => {
  try {
    // Validate dữ liệu liên hệ
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Nếu có lỗi validate, trả về danh sách lỗi cho client
      const errors = error.details.map((err) => err.message);
      return res.json({
        message: errors,
      });
    }

    // Tạo mới liên hệ
    const contact = await Contact.create(req.body);

    // Gửi email
    sendContact(req.body);

    // Trả về thông báo cho client khi thành công và thông tin liên hệ đã được tạo mới
    return res.json({
      message: "Phản hồi thành công",
      contact,
    });
  } catch (err) {
    console.error(err);

    // Thông báo cho client khi có lỗi xảy ra
    return res.json({ message: "Đã có lỗi xảy ra" });
  }
};

export { create };
