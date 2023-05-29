import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false });

commentSchema.virtual('name', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
    select: 'name'
});

export default mongoose.model("Comment", commentSchema);