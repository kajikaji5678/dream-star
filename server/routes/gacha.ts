import { Router } from "express";
import { drawCard } from "../service/gachaService.js";
import { saveUserCard } from "../service/gachaService.js";

const router = Router();

router.post("/", async(req, res) => {
  try {
    const {userId} = req.body;
    const card = await drawCard();
    await saveUserCard(userId, card.id);
    res.json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "500: ガチャ失敗"});
  }
});

export default router;