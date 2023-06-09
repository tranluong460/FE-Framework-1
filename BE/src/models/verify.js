import mongoose from "mongoose";

const verifySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Verify", verifySchema);
