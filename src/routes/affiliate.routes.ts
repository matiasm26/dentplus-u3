import { Router } from "express";

import {
    index,
    show,
    createForm,
    createAction,
    editForm,
    editAction,
    deleteAction,
    simulateDiscount
} from "../controllers/affiliate.controller";

const router = Router();

router.get("/", index);

router.get("/create", createForm);
router.post("/", createAction);

router.get("/:id/edit", editForm);
router.post("/:id/edit", editAction);

router.post("/:id/delete", deleteAction);
router.post("/:id/simulate", simulateDiscount);

router.get("/:id", show);

export default router;