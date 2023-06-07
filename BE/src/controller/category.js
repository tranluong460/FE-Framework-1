import Category from "../models/category";
import { categorySchema } from "../validate/category";

const getAll = async (req, res) => {
  try {
    const data = await Category.find();

    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Danh sách danh mục",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi lấy danh sách danh mục",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      message: "Thông tin danh mục",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi lấy thông tin danh mục",
    });
  }
};

const create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const category = await Category.create(req.body);

    return res.status(201).json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi tạo danh mục",
    });
  }
};

const edit = async (req, res) => {
  try {
    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi cập nhật danh mục",
    });
  }
};

const del = async (req, res) => {
  try {
    const data = await Category.findOneAndDelete({ _id: req.params.id });

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      message: "Xóa dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi xóa danh mục",
    });
  }
};

export { getAll, getOne, edit, create, del };
