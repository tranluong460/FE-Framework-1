import Order from "../models/order";
import { orderSchema } from "../validate/order";

const getAll = async (req, res) => {
  try {
    const data = await Order.find()
      .populate("user")
      .populate("products.product");

    if (!data || !data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Thông tin các đơn hàng",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");

    if (!data || !data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      message: "Thông tin đơn hàng",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const create = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    let status = "Đang xử lý";
    if (req.body.paymentMethod === "Thanh toán bằng thẻ") {
      status = "Chờ thanh toán";
    }

    const order = await Order.create({ ...req.body, status });

    return res.status(201).json({
      message: "Tạo đơn hàng thành công",
      orderId: order._id,
      order,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const edit = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    order.status = req.body.status;
    await order.save();

    return res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const del = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    await order.remove();

    return res.status(200).json({
      message: "Xóa đơn hàng thành công",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

// lấy thông tin đơn hàng
const findOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate("products.product")

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng cho userId đã chỉ định.' });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Lỗi truy vấn:', err);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm đơn hàng.' });
  }
};

export { getAll, getOne, edit, create, del, findOrdersByUserId };
