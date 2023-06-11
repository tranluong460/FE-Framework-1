import Product from "../models/product";
import { productSchema } from "../validate/product";
import mongoose from "mongoose";

const getAll = async (req, res) => {
  try {
    const data = await Product.find()
      .populate("brand")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      });

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Danh sách sản phẩm",
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
    const data = await Product.findById(req.params.id)
      .populate("brand")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      });

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      message: "Thông tin sản phẩm",
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
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const product = await Product.create(req.body);

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
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

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

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data,
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
    const data = await Product.findOneAndDelete({ _id: req.params.id });

    return res.status(200).json({
      message: "Xóa dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    let query;
    if (mongoose.Types.ObjectId.isValid(keyword)) {
      query = { brand: keyword };
    } else {
      const regex = new RegExp(keyword, "i");
      query = { name: { $regex: regex } };
    }

    const data = await Product.find(query)
      .populate("brand")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      });

    if (data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      message: "Thông tin sản phẩm",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

export { getAll, getOne, edit, create, del, searchProduct };
