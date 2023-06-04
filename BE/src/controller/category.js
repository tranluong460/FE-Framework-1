import Category from "../models/category";
import { categorySchema } from "../validate/category";

const getAll = async (req, res) => {
  try {
    // Lấy danh sách dữ liệu từ cơ sở dữ liệu
    const data = await Category.find();

    // Kiểm tra xem có dữ liệu nào không
    if (data.length === 0) {
      return res.json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về danh sách dữ liệu và thông báo thành công
    return res.json({
      message: "Danh sách danh mục",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy danh sách
    return res.json({
      message: err.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    // Tìm kiếm một danh mục dựa trên id được cung cấp
    const data = await Category.findById(req.params.id);

    // Kiểm tra xem có dữ liệu nào không
    if (data.length === 0) {
      return res.json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về thông tin danh mục và thông báo thành công
    return res.json({
      message: "Thông tin danh mục",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy thông tin
    return res.json({
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    // Kiểm tra và validate dữ liệu đầu vào
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({
        message: errors,
      });
    }

    // Tạo một danh mục mới dựa trên dữ liệu được cung cấp
    const category = await Category.create(req.body);

    // Trả về thông báo thành công và danh mục được tạo
    return res.json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo danh mục mới
    return res.json({
      message: err.message,
    });
  }
};

const edit = async (req, res) => {
  try {
    // Tìm và cập nhật danh mục dựa trên ID và dữ liệu được cung cấp
    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    // Kiểm tra và validate dữ liệu đầu vào
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({
        message: errors,
      });
    }

    // Trả về dữ liệu đã được cập nhật
    return res.json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi xảy ra nếu có
    return res.json({
      message: err.message,
    });
  }
};

const del = async (req, res) => {
  try {
    // Tìm và xóa danh mục dựa trên ID
    const data = await Category.findOneAndDelete({ _id: req.params.id });

    // Trả về thông báo xóa dữ liệu thành công
    return res.json({
      message: "Xóa dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);

    // Trả về thông báo lỗi nếu có lỗi xảy ra
    return res.json({
      message: err.message,
    });
  }
};

export { getAll, getOne, edit, create, del };
