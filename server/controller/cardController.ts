import type { Request, Response } from "express";
import * as cardService from "../service/cardService.js";

export async function getCards(
  _req: Request,
  res: Response
) {
  try {
    const cards = await cardService.findCards();
    res.json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "500" });
  }
}

export async function getCard(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "400" });

  try {
    const card = await cardService.findCardById(id);
    if (!card) return res.status(404).json({ error: "404" });
    res.json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "500" });
  }
}

export async function createCard(
  req: Request,
  res: Response
) {
  try {
    const { name, imageUrl, rarity } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: "400: カード名は必須" });
    if (!rarity?.trim()) return res.status(400).json({ error: "400: レア度は必須" });

    const card = await cardService.createCard({
      name: name.trim(),
      imageUrl,
      rarity: rarity.trim()
    });

    res.status(201).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "500" });
  }
}

export async function updateCard(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "不正ID",
    });
  }

  try {
    const { name, imageUrl, rarity } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: "400: カード名は必須" });
    if (!rarity?.trim()) return res.status(400).json({ error: "400: レア度は必須" });

    const card = await cardService.updateCard(id, {
      name: name.trim(),
      imageUrl,
      rarity: rarity.trim(),
    });

    res.json(card);

  } catch (error: unknown) {
    console.error(error);

    // Prismaの存在しないID更新
    if (error instanceof Error && "code" in error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        return res.status(404).json({ error: "404" });
      }
    }

    res.status(500).json({
      error: "カード更新に失敗しました",
    });
  }
}


export async function deleteCard(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "400" });

  try {
    const card = await cardService.removeCard(id);
    if (!card) return res.status(404).json({ error: "404" });

    res.json({ message: "削除しました" });

  } catch (error) {
    console.error(error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "404", });
    }

    res.status(500).json({ error: "500" });
  }
}

export async function getUserCards(
  req: Request,
  res: Response
) {
  try {
    const userId = req.params.userId as string;
    const cards = await cardService.findUserCards(userId);
    await cardService.newBoolean(userId);
    res.json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({error: "500"});
  }
}