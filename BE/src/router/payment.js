import express from "express";
import { processPayment } from "../controller/payment";

const router = express.Router();

router.post("/", processPayment);

export default router;
