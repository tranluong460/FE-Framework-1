import Comment from "../models/comment"

export const getAll = async (req, res) => {
    try {
        const comment = await Comment.find()
        if (comment.length === 0) {
            return res.status(404).json({
                message: 'khong co du lieu'
            })
        }
        return res.status(200).json({
            message: comment
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const get = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}