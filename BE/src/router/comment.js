import express from "express";
import { create, getAll } from "../controller/comment";

const router = express.Router();

router.get("/", getAll);
router.post("/:id", create);

export default router;
