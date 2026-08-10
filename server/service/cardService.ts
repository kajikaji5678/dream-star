import { prisma } from "../prisma.js";
import fs from "fs/promises";
import path from "path";


export async function findCards() {
  return prisma.card.findMany();
}


export async function findCardById(id: number) {
  return prisma.card.findUnique({
    where: {
      id,
    },
  });
}


export async function createCard(data: {
  name: string;
  imageUrl: string;
  rarity: string;
}) {
  return prisma.card.create({
    data,
  });
}


export async function updateCard(
  id: number,
  data: {
    name: string;
    imageUrl: string;
    rarity: string;
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

  return userCards.map((userCard) => ({...userCard.card, amount: userCard.amount, isNew: userCard.isNew}));
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