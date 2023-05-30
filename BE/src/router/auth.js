import express from "express";
import { getUser, login, register } from "../controller/auth";

const router = express.Router();

router.get("/user", getUser);
router.post("/login", login);
router.post("/register", register);

export default router;
