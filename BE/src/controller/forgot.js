import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user";
import { sendMail, sendRestPassword } from "../middleware/sendMail";
import { generateRandomCode } from "../component/function";

dotenv.config();

// Quên mật khẩu
export const getSecurityCode = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email không tồn tại",
    });
  }

  let randomCode = generateRandomCode();
  let randomString = uuidv4();

  const token = jwt.sign(
    { email: email, randomCode: randomCode, randomString: randomString },
    process.env.SECRET_KEY,
    { expiresIn: "3m" }
  );

  const resetPasswordUrl = `${process.env.APP_URL}/auth/reset-password/${randomString}`;
  sendMail(user.name, user.email, randomCode, resetPasswordUrl);

  return res.status(200).json({
    message: "Gửi mã thành công",
    accessCode: token,
  });
};

export const resetPassword = async (req, res) => {
  const { password, randomString, randomCode } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    if (
      randomString !== decoded.randomString ||
      randomCode !== decoded.randomCode
    ) {
      return res.status(400).json({
        message: "Mã bảo mật không chính xác!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "Không được giống mật khẩu cũ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userNew = await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.error(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đổi mật khẩu",
    });
  }
};

// Đổi mật khẩu
export const getCode = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email không tồn tại",
    });
  }

  let randomCode = generateRandomCode();

  sendRestPassword(user.name, user.email, randomCode);

  const code = jwt.sign({ code: randomCode }, process.env.SECRET_KEY, {
    expiresIn: "3m",
  });

  return res.status(200).json({
    message: "Gửi mã thành công",
    code,
  });
};

export const checkCode = async (req, res) => {
  try {
    const { code } = req.body;

    const codeCheck = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(codeCheck, process.env.SECRET_KEY);

    if (code !== decoded.code) {
      return res.status(400).json({
        message: "Mã bảo mật không chính xác!",
      });
    }

    return res.status(200).json({
      message: "Mã bảo mật chính xác",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, password, confirmPassword } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Hai mật khẩu không khớp!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    const checkPass = await bcrypt.compare(oldPassword, user.password);
    if (!checkPass) {
      return res.status(400).json({
        message: "Mật khẩu cũ không chính xác",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "Không được giống mật khẩu cũ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userNew = await User.findOneAndUpdate(
      { _id: decoded.id },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.error(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đổi mật khẩu",
    });
  }
};
