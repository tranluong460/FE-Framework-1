import Product from "../models/product";
import { productSchema } from "../validate/product";

const getAll = async (req, res) => {
  try {
    // Lấy tất cả sản phẩm từ cơ sở dữ liệu và gắn thông tin danh mục (brand) cho mỗi sản phẩm
    const data = await Product.find()
      .populate("brand")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      });

    // Kiểm tra nếu không có sản phẩm nào được tìm thấy
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về danh sách sản phẩm
    return res.status(200).json({
      message: "Danh sách sản phẩm",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const getOne = async (req, res) => {
  try {
    // Tìm sản phẩm dựa trên ID và gắn thông tin danh mục (brand) và bình luận (comments) cho sản phẩm
    const data = await Product.findById(req.params.id)
      .populate("brand")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      });

    // Kiểm tra nếu không tìm thấy sản phẩm
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Trả về thông tin sản phẩm
    return res.status(200).json({
      message: "Thông tin sản phẩm",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const create = async (req, res) => {
  try {
    // Kiểm tra và validate dữ liệu đầu vào
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Tạo mới sản phẩm
    const product = await Product.create(req.body);

    // Trả về thông báo cho client khi thành công
    return res.status(201).json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const edit = async (req, res) => {
  try {
    // Kiểm tra và validate dữ liệu đầu vào
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Tìm và cập nhật sản phẩm dựa trên ID và dữ liệu được cung cấp
    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Trả về dữ liệu đã được cập nhật
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi xảy ra nếu có
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const del = async (req, res) => {
  try {
    // Tìm và xóa sản phẩm dựa trên ID
    const data = await Product.findOneAndDelete({ _id: req.params.id });

    // Trả về thông báo xóa dữ liệu thành công
    return res.status(200).json({
      message: "Xóa dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);

    // Trả về thông báo lỗi nếu có lỗi xảy ra
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

export { getAll, getOne, edit, create, del };
