import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["FreeShip", "Percentage", "FixedAmount"],
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Discount", discountSchema);
