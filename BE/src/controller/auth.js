import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { loginSchema } from "../validate/login";
import { registerSchema } from "../validate/register";
import User from "../models/user";

dotenv.config();

export const getUser = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng nào",
            });
        }

        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Đã có lỗi xảy ra khi lấy thông tin người dùng",
        });
    }
};

// Hàm đăng nhập
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

        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
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

        return res.status(200).json({
            message: "Tạo tài khoản thành công",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Đã có lỗi xảy ra khi đăng ký",
        });
    }
};
