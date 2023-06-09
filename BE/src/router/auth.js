import express from "express";
import {
  getOneUser,
  getUser,
  login,
  register,
  lockAccount,
} from "../controller/auth";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/user", getUser);
router.get("/user/:id", getOneUser);
router.post("/login", login);
router.post("/register", register);
router.post("/lockAccount/:id", checkPermission, lockAccount);

export default router;
