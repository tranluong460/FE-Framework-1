import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user";
import Verify from "../models/verify";
import { loginSchema } from "../validate/login";
import { registerSchema } from "../validate/register";
import { sendVerifyEmail } from "../middleware/sendMail";
import { generateRandomCode } from "../component/function";
import user from "../models/user";

dotenv.config();

export const getUser = async (req, res) => {
  try {
    const users = await User.find().populate("isVerify");

    if (!users || users.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    return res.status(200).json({
      message: "Danh sách người dùng",
      usersWithoutPassword,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi lấy danh sách người dùng",
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id).populate("isVerify");

    if (!users) {
      return res.status(200).json({
        message: "Không tìm thấy người dùng",
      });
    }

    const { password, ...userWithoutPassword } = users.toObject();

    return res.status(200).json({
      message: "Thông tin người dùng",
      userWithoutPassword,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};

export const lockAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }

    user.isLockAccount = true;
    await user.save();

    return res.status(200).json({
      message: "Khóa tài khoản thành công",
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Mật khẩu không đúng",
      });
    }

    const isLockAccount = user.isLockAccount;
    if (isLockAccount) {
      return res.status(401).json({
        message: "Tài khoản bị khóa",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đăng nhập",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    if (req.body.password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const phoneNumberRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    const isPhoneNumberValid = phoneNumberRegex.test(req.body.phone);

    if (!isPhoneNumberValid) {
      return res.status(400).json({
        message: "Số điện thoại không đúng định dạng",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword,
    });

    let randomCode = generateRandomCode();
    let randomString = uuidv4();

    const token = jwt.sign(
      {
        email: req.body.email,
        randomCode: randomCode,
        randomString: randomString,
      },
      process.env.SECRET_KEY
    );

    const verifyUrl = `${process.env.APP_URL}/auth/verify-email/${token}`;

    sendVerifyEmail(req.body.email, req.body.name, randomCode, verifyUrl);

    const verify = await Verify.create({
      userId: user._id,
      email: req.body.email,
      phone: req.body.phone,
      verifyCode: token,
    });

    user.isVerify = verify._id;
    await user.save();

    return res.status(201).json({
      message:
        "Đăng ký thành công. Vui lòng kiểm tra email và xác minh tài khoản của bạn",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đăng ký",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const phoneNumberRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    const isPhoneNumberValid = phoneNumberRegex.test(req.body.phone);

    if (!isPhoneNumberValid) {
      return res.status(400).json({
        message: "Số điện thoại không đúng định dạng",
      });
    }

    const data = await user.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng để cập nhật thông tin",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thông tin người dùng thành công",
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi cập nhật",
    });
  }
};
