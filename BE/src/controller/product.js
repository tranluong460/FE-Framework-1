import Product from "../models/product";

export const getAll = async (req, res) => {
    try {
        const data = await Product.find()
        if (data.length === 0) {
            return res.status(404).json({ message: 'khong tim thay san pham' })
        }
        return res.status(200).json({
            message: data
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}
export const get = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id)
        if (data.length === 0) {
            return res.status(404).json({ message: 'khong tim thay san pham' })
        }
        return res.status(200).json({
            message: data
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}
export const createProduct = async (req, res) => {
    try {
        const data = await Product.create(req.body)
        if (data.length === 0) {
            return res.status(404).json({ message: 'khong them duoc san pham' })
        }
        return res.status(200).json({
            message: data
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}
export const deleteProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: 'xoa danh muc thanh cong',
            data
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (data.length === 0) {
            return res.status(404).json({ message: 'khong them san pham' })
        }
        return res.status(200).json({
            message: data
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}