import express from "express";
import {
  create,
  del,
  edit,
  findOrdersByUserId,
  getAll,
  getOne,
} from "../controller/order";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.get("/user/:userId", findOrdersByUserId);

router.post("/", create);

router.put("/:id", checkPermission, edit);

router.delete("/:id", checkPermission, del);

export default router;
