import Order from "../models/order";
import { orderSchema } from '../validate/order';

const getAll = async (req, res) => {
    try {
        const data = await Order.find().populate('user').populate('products.product');

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
        const data = await Order.findById(req.params.id).populate('user').populate('products.product');

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
        const { error } = orderSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const order = await Order.create(req.body);
        return res.status(200).json({
            message: 'Thêm đơn hàng thành công',
            order
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
        const { error } = orderSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id },
            { status: req.body.status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng",
            });
        }
        return res.status(200).json({
            message: "Cập nhật đơn hàng thành công",
            data: order,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const del = async (req, res) => {
    try {
        const data = await Order.findOneAndDelete({ _id: req.params.id });

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