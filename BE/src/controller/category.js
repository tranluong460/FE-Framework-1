import Category from '../models/category';
import joi from 'joi';

const categorySchema = joi.object({
    name: joi.string().required(),
    slug: joi.string().required(),
});

export const create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return res.status(201).json({
            message: "tạo sản phẩm thành công",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
};

export const getAll = async (req, res) => {
    try {
        const category = await Category.find();
        return res.status(201).json(category)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
};

export const get = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.status(201).json(category)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
};

export const remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: " xóa danh mục thành công",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
};

export const update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(201).json({
            message: " update danh mục thành công",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
};