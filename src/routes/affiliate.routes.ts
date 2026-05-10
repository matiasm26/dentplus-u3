import { Router } from "express";

import {
  index,
  show,
  createForm,
  createAction
} from "../controllers/affiliate.controller";

const router = Router();

router.get("/", index);
router.get("/create", createForm);
router.post("/", createAction);
router.get("/:id", show);
router.get("/:id", show);

export default router;