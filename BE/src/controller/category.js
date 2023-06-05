import Category from "../models/category";
import { categorySchema } from "../validate/category";

const getAll = async (req, res) => {
  try {
    // Lấy danh sách dữ liệu từ cơ sở dữ liệu
    const data = await Category.find();

    // Kiểm tra xem có dữ liệu nào không
    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    // Trả về danh sách dữ liệu và thông báo thành công
    return res.status(200).json({
      message: "Danh sách danh mục",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy danh sách
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách danh mục",
    });
  }
};

const getOne = async (req, res) => {
  try {
    // Tìm kiếm một danh mục dựa trên id được cung cấp
    const data = await Category.findById(req.params.id);

    // Kiểm tra xem có dữ liệu nào không
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    // Trả về thông tin danh mục và thông báo thành công
    return res.status(200).json({
      message: "Thông tin danh mục",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy thông tin
    return res.status(500).json({
      message: "Lỗi khi lấy thông tin danh mục",
    });
  }
};

const create = async (req, res) => {
  try {
    // Kiểm tra và validate dữ liệu đầu vào
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Tạo một danh mục mới dựa trên dữ liệu được cung cấp
    const category = await Category.create(req.body);

    // Trả về thông báo thành công và danh mục được tạo
    return res.status(201).json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo danh mục mới
    return res.status(500).json({
      message: "Lỗi khi tạo danh mục",
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
      return res.status(400).json({
        message: errors,
      });
    }

    // Kiểm tra xem có dữ liệu nào không
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    // Trả về dữ liệu đã được cập nhật
    return res.status(200).json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (err) {
    console.log(err);

    // Trả về lỗi xảy ra nếu có
    return res.status(500).json({
      message: "Lỗi khi cập nhật danh mục",
    });
  }
};

const del = async (req, res) => {
  try {
    // Tìm và xóa danh mục dựa trên ID
    const data = await Category.findOneAndDelete({ _id: req.params.id });

    // Kiểm tra xem có dữ liệu nào không
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    // Trả về thông báo xóa dữ liệu thành công
    return res.status(200).json({
      message: "Xóa dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);

    // Trả về thông báo lỗi nếu có lỗi xảy ra
    return res.status(500).json({
      message: "Lỗi khi xóa danh mục",
    });
  }
};

export { getAll, getOne, edit, create, del };
