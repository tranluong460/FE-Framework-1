import express from "express";
import { create, del, edit, getAll, getOne } from "../controller/category";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router()

router.get("/", getAll)

router.get("/:id", getOne)

router.post("/", checkPermission, create)

router.put("/:id", checkPermission, edit)

router.delete('/:id', checkPermission, del)

export default router