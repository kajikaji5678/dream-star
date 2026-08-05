import { Router } from "express";
import { show } from "../controller/userController.js";

const router = Router();

router.get("/:id", show);

export default router;