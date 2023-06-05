import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user";
import { sendMail } from "../middleware/sendMail";
import { generateRandomCode } from "../component/function";

dotenv.config();

export const getSecurityCode = async (req, res) => {
  // Tìm người dùng dựa trên email
  const { email } = req.body;

  // Nếu không tìm thấy người dùng, trả về thông báo cho client
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email không tồn tại",
    });
  }

  // Sinh mã ngẫu nhiên và chuỗi ngẫu nhiên
  let randomCode = generateRandomCode();
  let randomString = uuidv4();

  // Tạo token JWT với thông tin email, mã ngẫu nhiên, và chuỗi ngẫu nhiên
  const token = jwt.sign(
    { email: email, randomCode: randomCode, randomString: randomString },
    process.env.SECRET_KEY,
    { expiresIn: "3m" }
  );

  // Tạo URL đặt lại mật khẩu
  const resetPasswordUrl = `${process.env.APP_URL}/auth/reset-password/${randomString}`;

  // Gửi email chứa thông tin mã và URL đặt lại mật khẩu
  sendMail(user.name, user.email, randomCode, resetPasswordUrl);

  // Trả về thông báo cho client khi thành công và mã truy cập (token)
  return res.status(200).json({
    message: "Gửi mã thành công",
    accessCode: token,
  });
};

export const resetPassword = async (req, res) => {
  const { password, randomString, randomCode } = req.body;

  try {
    // Lấy token từ header của request
    const token = req.headers.authorization.split(" ")[1];

    // Giải mã token và lấy thông tin email từ token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Tìm người dùng dựa trên email trong token
    const user = await User.findOne({ email: decoded.email });

    // Nếu không tìm thấy người dùng, trả về thông báo cho client
    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    // Kiểm tra xem mã bảo mật và chuỗi ngẫu nhiên có khớp với thông tin trong token không
    if (
      randomString !== decoded.randomString ||
      randomCode !== decoded.randomCode
    ) {
      return res.status(400).json({
        message: "Mã bảo mật không chính xác!",
      });
    }

    // Kiểm tra độ dài mật khẩu mới
    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    // Kiểm tra xem mật khẩu mới có giống với mật khẩu cũ không
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "Không được giống mật khẩu cũ",
      });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật mật khẩu mới cho người dùng
    const userNew = await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword },
      { new: true }
    );

    // Trả về thông báo cho client khi đổi mật khẩu thành công
    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.error(err);

    // Trả về thông báo cho client khi có lỗi xảy ra trong quá trình đổi mật khẩu
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đổi mật khẩu",
    });
  }
};
