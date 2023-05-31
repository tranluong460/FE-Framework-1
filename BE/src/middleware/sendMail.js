import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { FormEmail } from '../component/formEmail';

dotenv.config();

export const sendMail = async (name, email, randomCode, resetPasswordUrl) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    });

    let info = await transporter.sendMail({
        from: 'bavuongnganhthuongcung4@gmail.com',
        to: email,
        subject: "Quên mật khẩu",
        text: "Chào bạn, " + email,
        html: `Xin chào ${name}, ${FormEmail(name, email, randomCode, resetPasswordUrl)}`,
    });
}
