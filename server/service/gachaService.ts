import { eventEmitter } from "../events/eventEmitter.ts";
import type { Card } from "../generated/prisma/index.js";
import { prisma } from "../prisma.js";
import { performance } from "node:perf_hooks";

export function drawCard(cards: Card[]): Card {
  const rarity = getRandomRarity();
  const candidates = cards.filter((card) => card.rarity === rarity);

  if (candidates.length === 0) {
    throw new Error("該当カードなし");
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);

  return candidates[randomIndex];
}

function getRandomRarity() {
  const random = Math.random() * 100;

  if (random <= 65) return "C";
  if (65 < random && random < 85) return "SP";
  if (85 <= random && random < 96.32) return "R";
  if (96.32 <= random && random < 99.32) return "DREAM";
  if (99.32 <= random && random < 99.92) return "DR";
  if (99.92 <= random) return "GXR";
}

// findFirst()で検索してからupdateかcreateをやってるのでDBアクセス2回
// upsertにする
export async function saveUserCard(userId: string, cardId: number) {
  await prisma.userCard.upsert({
    where: {
      userId_cardId: {
        userId,
        cardId,
      },
    },
    update: {
      amount: {
        increment: 1,
      },
    },
    create: {
      userId,
      cardId,
      isNew: true,
    },
  });
}

export async function consumePoint(userId: string, cost: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("ユーザーが存在しません");
  if (user.points < cost) throw new Error("ポイントが不足しています");

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      points: {
        decrement: cost,
      },
    },
  });
}

export async function drawTenGacha(userId: string) {
  // Measurement of processing time (20261011)
  const totalStart = performance.now();

  let start = performance.now();
  await consumePoint(userId, 20);
  console.log("consumePoint:", (performance.now() - start).toFixed(1), "ms");

  start = performance.now();
  const allCards = await prisma.card.findMany();
  console.log("findMany:", (performance.now() - start).toFixed(1), "ms");

  start = performance.now();
  const cards: Card[] = [];
  for (let i = 0; i < 10; i++) {
    const card = drawCard(allCards);
    await saveUserCard(userId, card.id);
    cards.push(card);
  }
  console.log(
    "draw + saveUserCard * 10",
    (performance.now() - start).toFixed(1),
    "ms",
  );

  start = performance.now();
  eventEmitter.emit("gacha.completed", {
    userId,
    gachaType: "ten",
    cards,
  });
  console.log("eventEmitter:", (performance.now() - start).toFixed(1), "ms");

  console.log("total:", (performance.now() - totalStart).toFixed(1), "ms");
  return { cards };
}
