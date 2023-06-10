import express from "express";
import {
  processPayment,
  getAllDiscount,
  getOneDiscount,
  createDiscount,
  getDiscountByCode,
} from "../controller/payment";

const router = express.Router();

router.post("/payment", processPayment);
router.get("/discount", getAllDiscount);
router.get("/discount/:id", getOneDiscount);
router.post("/discountByCode", getDiscountByCode);
router.post("/discount", createDiscount);

export default router;
