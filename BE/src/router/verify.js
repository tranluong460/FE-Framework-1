import express from "express";
import { verifyEmail } from "../controller/verify";

const router = express.Router();

router.post("/verify-email", verifyEmail);

export default router;
