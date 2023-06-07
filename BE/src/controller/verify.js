import Verify from "../models/verify";
import User from "../models/user";

export const verifyEmail = async (req, res) => {
  try {
    const { randomString } = req.params;

    const verification = await Verify.findOne({ randomString });
    if (!verification) {
      return res.status(404).json({
        message: "Xác minh không hợp lệ",
      });
    }
    if (verification.isEmailVerified) {
      return res.status(400).json({
        message: "Email đã được xác minh trước đó",
      });
    }

    const user = await User.findById(verification.userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    verification.isEmailVerified = true;
    await verification.save();

    return res.status(200).json({
      message: "Xác minh email thành công",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi xác minh email",
    });
  }
};
