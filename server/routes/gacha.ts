import { Router } from "express";
import { drawGacha, drawTen } from "../controller/gachaController.ts";


const router = Router();

router.post("/", drawGacha);
router.post("/ten", drawTen);

export default router;