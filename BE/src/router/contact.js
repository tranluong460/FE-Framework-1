import express from "express";
import { create } from "../controller/contact";

const router = express.Router();

router.post("/", create);

export default router;
