import Order from "../models/order";
import { orderSchema } from "../validate/order";

const getAll = async (req, res) => {
  try {
    // Lấy tất cả các đơn hàng từ cơ sở dữ liệu
    const data = await Order.find()
      .populate("user") // Tham chiếu đến model User để lấy thông tin người dùng
      .populate("products.product"); // Tham chiếu đến model Product để lấy thông tin sản phẩm trong đơn hàng

    // Kiểm tra xem có dữ liệu đơn hàng hay không
    if (!data || !data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về dữ liệu đơn hàng cho client
    return res.status(200).json({
      message: "Thông tin các đơn hàng",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi trong quá trình xử lý
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const getOne = async (req, res) => {
  try {
    // Tìm đơn hàng dựa trên ID được truyền vào
    const data = await Order.findById(req.params.id)
      .populate("user") // Tham chiếu đến model User để lấy thông tin người dùng liên quan
      .populate("products.product"); // Tham chiếu đến model Product để lấy thông tin sản phẩm liên quan

    // Kiểm tra xem có dữ liệu đơn hàng hay không
    if (!data || !data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    // Trả về dữ liệu đơn hàng cho client
    return res.status(200).json({
      message: "Thông tin đơn hàng",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi trong quá trình xử lý
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const create = async (req, res) => {
  try {
    // Kiểm tra hợp lệ của dữ liệu đơn hàng
    const { error } = orderSchema.validate(req.body, { abortEarly: false });

    if (error) {
      // Nếu có lỗi, lấy danh sách các lỗi và trả về cho client
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Tạo đơn hàng mới
    const order = await Order.create(req.body);

    // Trả về thông báo thành công và đơn hàng vừa được tạo
    return res.status(201).json({
      message: "Tạo đơn hàng thành công",
      order,
    });
  } catch (err) {
    console.log(err);

    // Nếu có lỗi trong quá trình xử lý, trả về thông báo lỗi cho client
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const edit = async (req, res) => {
  try {
    // Kiểm tra hợp lệ của dữ liệu đơn hàng
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
      // Nếu có lỗi, lấy danh sách các lỗi và trả về cho client
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Kiểm tra xem đơn hàng có tồn tại hay không
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    // Cập nhật trạng thái đơn hàng
    order.status = req.body.status;
    await order.save();

    return res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  } catch (err) {
    console.log(err);

    // Nếu có lỗi trong quá trình xử lý, trả về thông báo lỗi cho client
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const del = async (req, res) => {
  try {
    // Kiểm tra xem đơn hàng có tồn tại hay không
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    // Xóa đơn hàng
    await order.remove();

    return res.status(200).json({
      message: "Xóa đơn hàng thành công",
    });
  } catch (err) {
    console.log(err);

    // Nếu có lỗi trong quá trình xử lý, trả về thông báo lỗi cho client
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

export { getAll, getOne, edit, create, del };
