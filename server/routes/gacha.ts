import { Router } from "express";
import { drawCard } from "../service/gachaService.ts";

const router = Router();

router.post("/", drawCard);

export default router;