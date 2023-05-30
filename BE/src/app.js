import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

import authRouter from "./router/auth";

import cors from "cors";

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.use('/product') // Router quản lý sản phẩm
app.use('/category') // Router quản lý danh mục
app.use('/order') // Router quản lý đơn hàng
app.use('/comment') // Router bình luận
app.use('/', authRouter) // Router đăng nhập, đăng kí
app.use('/') // Router quên mật khẩu

mongoose.connect(process.env.URI)

export const viteNodeApp = app;