import { Router } from "express";
import { drawCard } from "../service/gachaService.ts";

const router = Router();

router.post("/", async(req, res) => {
  try {
    const card = await drawCard();
    res.json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "500: ガチャ失敗"});
  }
});

export default router;