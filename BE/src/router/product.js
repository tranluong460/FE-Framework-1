import express from "express";
import {
  create,
  del,
  edit,
  getAll,
  getOne,
  searchProduct,
} from "../controller/product";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/", getAll);

router.get("/search/:keyword", searchProduct);

router.get("/:id", getOne);

router.post("/", checkPermission, create);

router.patch("/:id", checkPermission, edit);

router.delete("/:id", checkPermission, del);

export default router;
