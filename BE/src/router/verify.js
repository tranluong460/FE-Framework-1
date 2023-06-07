import express from "express";
import { verifyEmail } from "../controller/verify";

const router = express.Router();

router.post("/verify-email/:id", verifyEmail);

export default router;
