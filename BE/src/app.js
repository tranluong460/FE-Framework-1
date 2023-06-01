import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

import authRouter from "./router/auth";
import productRouter from "./router/product";
import forgotRouter from "./router/forgot";
import orderRouter from "./router/order";
import categoriRouter from "./router/category";
import cors from "cors";

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.use('/product', productRouter)
app.use('/', categoriRouter)
app.use('/order', orderRouter)
// app.use('/comment') // Router bình luận
app.use('/', authRouter)
app.use('/', forgotRouter)

mongoose.connect(process.env.URI)

export const viteNodeApp = app;