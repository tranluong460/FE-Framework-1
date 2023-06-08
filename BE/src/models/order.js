import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Thanh toán khi nhận hàng", "Thanh toán bằng thẻ"],
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: [
        "Chờ thanh toán",
        "Đang xử lý",
        "Đang giao hàng",
        "Đã giao hàng",
        "Đã hủy",
        "Đã hoàn tiền",
        "Đã hoàn thành",
      ],
      default: "Đang xử lý",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
