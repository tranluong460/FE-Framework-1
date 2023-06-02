import express from "express";
import { create } from "../controller/comment";

const router = express.Router();

router.post("/:id", create);

export default router;
