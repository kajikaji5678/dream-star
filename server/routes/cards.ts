import { Router } from "express";
import { prisma } from "../prisma.js";

const router = Router();

// カード一覧取得
router.get("/", async (_req, res) => {
  try {
    const cards = await prisma.card.findMany();

    res.json(cards);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "カード取得に失敗しました",
    });
  }
});

// カード登録
router.post("/", async (req, res) => {
  try {
    const { name, imageUrl, rarity } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        error: "カード名は必須です",
      });
    }

    if (!rarity?.trim()) {
      return res.status(400).json({
        error: "レア度は必須です",
      });
    }

    const card = await prisma.card.create({
      data: {
        name: name.trim(),
        imageUrl,
        rarity: rarity.trim(),
      },
    });

    res.status(201).json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "カード登録に失敗しました",
    });
  }
});

export default router;