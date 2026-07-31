import { Router } from "express";
import { prisma } from "../prisma.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import fs from "fs/promises";
import path from "path";

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

// カード編集画面の情報取得
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "不正ID" })
  }

  try {
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      return res.status(404).json({ error: "カードがない" });
    }

    res.json(card);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

// カード更新
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "不正ID",
    });
  }

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

    const card = await prisma.card.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
        imageUrl,
        rarity: rarity.trim(),
      },
    });

    res.json(card);
  } catch (error) {
    console.log(error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "カードが存在しません",
        });
      }
    }
    res.status(500).json({
      error: "カード更新に失敗しました",
    });
  }
});

// カード削除
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      return res.status(404).json({ message: "カードが見つからない" });
    }

    if (card.imageUrl) {
      const filePath = path.join(
        process.cwd(),
        "uploads",
        "cards",
        path.basename(card.imageUrl)
      );

      try {
        await fs.unlink(filePath);
      } catch (e) {
        console.error("削除失敗", e);
      }
    }

    await prisma.card.delete({
      where: { id }
    });
    res.json({ message: "削除しました" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "失敗しました" });
  }

})

export default router;