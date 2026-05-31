import { Router } from "express";
import {
  loginForm,
  loginAction,
  registerForm,
  registerAction,
  logout
} from "../controllers/auth.controller";

const router = Router();

router.get("/login", loginForm);
router.post("/login", loginAction);

router.get("/login/register", registerForm);
router.post("/login/register", registerAction);

router.post("/logout", logout);

export default router;