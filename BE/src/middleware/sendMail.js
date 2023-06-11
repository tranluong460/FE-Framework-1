import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  FormEmail,
  FormRestPassword,
  FormVerify,
} from "../component/formEmail";

dotenv.config();

// Quên mật khẩu
export const sendMail = async (name, email, randomCode, resetPasswordUrl) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Quên mật khẩu",
    text: "Chào bạn, " + email,
    html: `${FormEmail(name, email, randomCode, resetPasswordUrl)}`,
  });
};

// Gửi hỗ trợ
export const sendContact = async ({ name, email, content }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Trả lời phản hồi",
    text: "Chào bạn, " + email,
    html: /*html*/ `<div>
    <h3>Chào ${name},</h3>
    <p>Chúng tôi xin gửi email này để gửi lời cảm ơn chân thành đến bạn vì đã phản hồi về [${content}]. Sự phản hồi của bạn có ý nghĩa quan trọng đối với chúng tôi và chúng tôi rất trân trọng điều đó.</p>
    <p>Chúng tôi luôn đánh giá cao sự góp ý, ý kiến và phản hồi của người dùng. Điều này giúp chúng tôi nâng cao chất lượng sản phẩm/dịch vụ của mình và mang đến trải nghiệm tốt hơn cho khách hàng. Phản hồi của bạn sẽ được chúng tôi chuyển tiếp cho nhóm liên quan để xem xét và đưa ra các biện pháp cải tiến.</p>
    <p>Nếu bạn có bất kỳ yêu cầu hoặc câu hỏi nào khác, xin vui lòng liên hệ với chúng tôi. Chúng tôi luôn sẵn lòng hỗ trợ bạn.</p>
    <p>Một lần nữa, chúng tôi xin chân thành cảm ơn sự phản hồi của bạn. Sự hỗ trợ và đóng góp của bạn là điều quan trọng để chúng tôi có thể tiếp tục cung cấp dịch vụ tốt nhất cho người dùng.</p>
    <br>
    <p>Trân trọng.</p>
  </div>`,
  });
};

// Kích hoạt email
export const sendVerifyEmail = async (email, name, randomCode, verifyUrl) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Xác minh tài khoản",
    text: "Chào bạn, " + email,
    html: `${FormVerify(name, email, randomCode, verifyUrl)}`,
  });
};

// Đổi mật khẩu
export const sendRestPassword = async (name, email, randomCode) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "bavuongnganhthuongcung4@gmail.com",
    to: email,
    subject: "Thay đổi mật khẩu",
    text: "Chào bạn, " + email,
    html: `${FormRestPassword(name, email, randomCode)}`,
  });
};
