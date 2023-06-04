import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user";

dotenv.config();

// Middleware kiểm tra quyền truy cập
export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    // Giải mã token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Tìm người dùng dựa trên ID đã giải mã từ token
    const user = await User.findById(decoded.id);

    // Kiểm tra vai trò của người dùng
    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập!",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    // Xử lý lỗi khi giải mã token không thành công
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Token không hợp lệ!",
      });
    } else {
      console.error(err);

      return res.status(500).json({
        message: "Đã xảy ra lỗi!",
      });
    }
  }
};
