import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user";
import Comment from "../models/comment";
import Product from "../models/product";

import { commentSchema } from "../validate/comment";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    // Lấy danh sách dữ liệu từ cơ sở dữ liệu
    const data = await Comment.find().populate("user");

    // Kiểm tra xem có dữ liệu nào không
    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về danh sách dữ liệu và thông báo thành công
    return res.status(200).json({
      message: "Danh sách bình luận",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy danh sách
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách bình luận",
    });
  }
};

const create = async (req, res) => {
  try {
    // Kiểm tra token từ header của request
    const token = req.headers.authorization?.split(" ")[1];

    // Nếu không tồn tại token, trả về mã lỗi 401 và thông báo cho client
    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    // Validate dữ liệu bình luận
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Nếu có lỗi validate, trả về danh sách lỗi cho client
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Giải mã token và tìm thông tin người dùng
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    // Tạo mới bình luận
    const newComment = await Comment.create({
      ...req.body,
      user: user._id,
      content: req.body.content,
    });

    // Cập nhật danh sách bình luận của sản phẩm
    await Product.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    // Trả về thông báo cho client khi thành công
    return res.status(201).json({
      message: "Thêm bình luận thành công",
      newComment,
    });
  } catch (err) {
    console.error(err);

    // Thông báo cho client khi có lỗi xảy ra
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi bình luận",
    });
  }
};

export { create };
