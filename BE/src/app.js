import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

import productRouter from "./router/product";
import categoryRouter from "./router/category";
import orderRouter from "./router/order";
import commentRouter from "./router/comment";
import contactRouter from "./router/contact";
import paymentRouter from "./router/payment";
import authRouter from "./router/auth";
import forgotRouter from "./router/forgot";
import verifyRouter from "./router/verify";

import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/comment", commentRouter);
app.use("/contact", contactRouter);
app.use("/", paymentRouter);
app.use("/", forgotRouter);
app.use("/", verifyRouter);
app.use("/", authRouter);

mongoose.connect(process.env.URI);

export const viteNodeApp = app;
