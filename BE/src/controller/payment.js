import Payment from "../models/payment";
import Order from "../models/order";
import { paymentSchema } from "../validate/payment";

export const processPayment = async (req, res) => {
  try {
    const { orderId, cardHolderName, cardNumber, expirationDate, cvv } =
      req.body;

    const { error } = paymentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Kiểm tra xem orderId có tồn tại trong cơ sở dữ liệu không
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    // Kiểm tra trạng thái đơn hàng để đảm bảo nó có thể được thanh toán
    if (order.status !== "Chờ thanh toán") {
      return res.status(400).json({
        message: "Không thể thanh toán đơn hàng này",
      });
    }

    // Tạo dữ liệu thanh toán
    const paymentData = {
      orderId: orderId,
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
    };

    // Lưu thông tin thanh toán vào cơ sở dữ liệu
    const payment = await Payment.create(paymentData);

    // Cập nhật thông tin thanh toán trong đơn hàng
    order.payment = payment._id;
    order.status = "Đang xử lý";

    // Lưu đơn hàng đã được cập nhật
    await order.save();

    return res.status(200).json({
      message: "Đã thanh toán thành công",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Có lỗi xảy ra khi thanh toán",
    });
  }
};
