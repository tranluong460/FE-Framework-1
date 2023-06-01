import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    original_price: {
        type: Number,
        min: 0,
        required: true
    },
    short_description: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    images: [
        {
            base_url: {
                type: String,
                required: true
            },
            is_gallery: Boolean,
            label: {
                type: String,
                default: null
            },
            large_url: String,
            medium_url: String,
            position: {
                type: String,
                default: null
            },
            small_url: String,
            thumbnail_url: String
        }
    ],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    specifications: [
        {
            name: {
                type: String,
                required: false
            },
            attributes: [
                {
                    code: {
                        type: String,
                        required: false
                    },
                    name: {
                        type: String,
                        required: false
                    },
                    value: {
                        type: String,
                        required: false
                    },
                }
            ]
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model("Product", productSchema);