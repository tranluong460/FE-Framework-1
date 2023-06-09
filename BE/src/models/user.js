import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    isLockAccount: {
      type: Boolean,
      default: false,
    },
    isVerify: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Verify",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
