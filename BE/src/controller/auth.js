import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import { loginSchema } from "../validate/login";
import { registerSchema } from "../validate/register";
import User from "../models/user";

dotenv.config();

export const getUser = async (req, res) => {
  try {
    // Lấy danh sách người dùng từ cơ sở dữ liệu
    const users = await User.find();

    // Kiểm tra xem có người dùng nào không
    if (!users || users.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    // Loại bỏ trường mật khẩu khỏi các đối tượng người dùng
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    // Trả về danh sách người dùng không bao gồm thông tin mật khẩu
    return res.status(200).json({
      message: "Danh sách người dùng",
      usersWithoutPassword,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy thông tin
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi lấy danh sách người dùng",
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const users = await User.findById(req.params.id);

    // Kiểm tra xem có người dùng không
    if (!users) {
      return res.status(200).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Loại bỏ trường mật khẩu khỏi đối tượng người dùng
    const { password, ...userWithoutPassword } = users.toObject();

    // Trả về thông tin người dùng không bao gồm thông tin mật khẩu
    return res.status(200).json({
      message: "Thông tin người dùng",
      userWithoutPassword,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy thông tin
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};

// Khóa tài khoản
export const lockAccount = async (req, res) => {
  try {
    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Cập nhật trạng thái người dùng
    user.isLockAccount = true;
    await user.save();

    return res.status(200).json({
      message: "Khóa tài khoản thành công",
      user,
    });
  } catch (err) {
    console.log(err);

    // Nếu có lỗi trong quá trình xử lý, trả về thông báo lỗi cho client
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

// Hàm đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào sử dụng schema
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Trả về lỗi nếu dữ liệu đầu vào không hợp lệ
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    // Tìm người dùng trong cơ sở dữ liệu bằng email
    const user = await User.findOne({ email });

    if (!user || user.length === 0) {
      // Trả về lỗi nếu email không tồn tại trong cơ sở dữ liệu
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }

    // So sánh mật khẩu đã nhập với mật khẩu được lưu trữ
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Trả về lỗi nếu mật khẩu không đúng
      return res.status(401).json({
        message: "Mật khẩu không đúng",
      });
    }

    const isLockAccount = user.isLockAccount;
    if (isLockAccount) {
      // Trả về lỗi nếu mật khẩu không đúng
      return res.status(401).json({
        message: "Tài khoản bị khóa",
      });
    }
    // Tạo mã thông báo JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Xóa trường mật khẩu trong đối tượng người dùng
    user.password = undefined;

    // Trả về thông tin đăng nhập thành công và mã thông báo
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình đăng nhập
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đăng nhập",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Trả về lỗi nếu dữ liệu đầu vào không hợp lệ
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    if (req.body.password.length < 6) {
      // Trả về lỗi nếu mật khẩu không đạt yêu cầu độ dài tối thiểu
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      // Trả về lỗi nếu email đã tồn tại trong cơ sở dữ liệu
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const phoneNumberRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    const isPhoneNumberValid = phoneNumberRegex.test(req.body.phone);

    if (!isPhoneNumberValid) {
      // Trả về lỗi nếu số điện thoại không đúng định dạng
      return res.status(400).json({
        message: "Số điện thoại không đúng định dạng",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Tạo người dùng mới trong cơ sở dữ liệu
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword,
    });

    // Trả về thông tin tạo tài khoản thành công
    return res.status(201).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    console.log(error);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình đăng ký
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đăng ký",
    });
  }
};
