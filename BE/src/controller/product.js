import Product from "../models/product";
import { productSchema } from '../validate/product'

const getAll = async (req, res) => {
    try {
        const data = await Product.find().populate('brand');

        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu"
            })
        }
        return res.json(data)
    }
    catch (err) {
        return res.status(404).json({
            message: err
        });
    }
}

const getOne = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id).populate('brand').populate({
            path: 'comments',
            populate: {
                path: 'user', select: 'name'
            }
        });

        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu"
            })
        }
        return res.json(data)
    }
    catch (err) {
        return res.status(404).json({
            message: err
        });
    }
}

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
        return res.status(200).json({
            message: 'Thêm sản phẩm thành công',
            product
        })
    }
    catch (err) {
        return res.status(404).json({
            message: err
        });
    }
}

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

        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật dữ liệu không thành công"
            })
        }
        return res.status(200).json({
            message: 'Cập nhật sản phẩm thành công',
            data
        })
    }
    catch (err) {
        return res.status(404).json({
            message: err
        });
    }
}

const del = async (req, res) => {
    try {
        const data = await Product.findOneAndDelete({ _id: req.params.id });

        return res.json({
            message: "Xóa dữ liệu thành công"
        })
    }
    catch (err) {
        return res.status(404).json({
            message: err
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