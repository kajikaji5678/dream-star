import { Router } from "express";
import { drawGacha } from "../controller/gachaController.ts";

const router = Router();

router.post("/", drawGacha);

export default router;