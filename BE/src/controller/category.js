import Category from "../models/category";
import { categorySchema } from '../validate/category'

const getAll = async (req, res) => {
    try {
        const data = await Category.find();

        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu"
            })
        }
        return res.json(data)
    }
    catch (err) {
        return res.status(404).json({
            message: err.message
        });
    }
}

const getOne = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);

        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu"
            })
        }
        return res.json(data)
    }
    catch (err) {
        return res.status(404).json({
            message: err.message
        });
    }
}

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
        return res.status(200).json({
            message: 'Thêm sản phẩm thành công',
            category
        })
    }
    catch (err) {
        return res.status(404).json({
            message: err.message
        });
    }
}

const edit = async (req, res) => {
    try {
        const data = await Category.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật dữ liệu không thành công"
            })
        }
        return res.json(data)
    }
    catch (err) {
        return res.status(404).json({
            message: err.message
        });
    }
}

const del = async (req, res) => {
    try {
        const data = await Category.findOneAndDelete({ _id: req.params.id });

        return res.json({
            message: "Xóa dữ liệu thành công"
        })
    }
    catch (err) {
        return res.status(404).json({
            message: err.message
        });
    }
}

export {
    getAll,
    getOne,
    edit,
    create,
    del
}