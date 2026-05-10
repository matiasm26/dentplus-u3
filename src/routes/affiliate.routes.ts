import { Router } from "express";

import {
  index,
  show,
  createForm,
  createAction,
  editForm,
  editAction
} from "../controllers/affiliate.controller";

const router = Router();

router.get("/", index);

router.get("/create", createForm);
router.post("/", createAction);

router.get("/:id/edit", editForm);
router.post("/:id/edit", editAction);

router.get("/:id", show);

export default router;