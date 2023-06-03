import dotenv from "dotenv";

import Contact from "../models/contact";

import { sendContact } from "../middleware/sendMail";

import { contactSchema } from "../validate/contact";

dotenv.config();

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

    return res.status(200).json({
      message: "Gửi liên hệ thành công",
      contact,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

export { create };
