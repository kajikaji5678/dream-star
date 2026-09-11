import { prisma } from "../prisma.js";
import fs from "fs/promises";
import path from "path";
import type { CardFormData } from "../../src/types/card.ts"


export async function findCards() {
  return prisma.card.findMany();
}


export async function findCardById(id: number) {
  return prisma.card.findUnique({
    where: {
      id,
    },
    include: {
      abilities: true,
    }
  });
}


export async function createCard(data: CardFormData) {
  return prisma.card.create({
    data: {
      ...data,
      hp: data.hp === "" ? null : data.hp,
      attack: data.attack === "" ? null : data.attack,
      escapePoint: data.escapePoint === "" ? null : data.escapePoint,
      consumePoint: data.consumePoint === "" ? null : data.consumePoint,
    }
  });
}


export async function updateCard(
  id: number,
  data: {
    name: string;
    imageUrl: string;
    rarity: string;
    hp: number;
    attack: number;
    escapePoint: number;
    category: string;
    consumePoint: number;
  }
) {
  return prisma.card.update({
    where: {
      id,
    },
    data,
  });
}


export async function removeCard(id: number) {
  const card = await prisma.card.findUnique({
    where: {
      id,
    },
  });

  if (!card) {
    return null;
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
      console.error("画像削除失敗", e);
    }
  }

  await prisma.card.delete({
    where: {
      id,
    },
  });

  return card;
}

export async function findUserCards(userId: string) {
  const userCards = await prisma.userCard.findMany({
    where: {
      userId,
    },
    include: {
      card: true
    },
  });

  return userCards.map((userCard) => ({ ...userCard.card, amount: userCard.amount, isNew: userCard.isNew }));
}

export async function newBoolean(userId: string) {
  await prisma.userCard.updateMany({
    where: {
      userId,
      isNew: true
    },
    data: {
      isNew: false
    },
  });
}