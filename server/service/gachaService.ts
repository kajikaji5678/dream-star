import { eventEmitter } from "../events/eventEmitter.ts";
import type { Card } from "../generated/prisma/index.js";
import { prisma } from "../prisma.js";
import { performance } from "node:perf_hooks";
import { Prisma } from "../generated/prisma/index.js";

export function drawCard(cards: Card[]): Card {
  const rarity = getRandomRarity();
  const candidates = cards.filter((card) => card.rarity === rarity);

  if (candidates.length === 0) {
    throw new Error("該当カードなし");
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);

  return candidates[randomIndex];
}

export async function saveUserCardsBulk(
  userId: string,
  cardIds: number[],
): Promise<void> {
  // カードIDごとに枚数を集計する
  const cardCounts = new Map<number, number>();

  for (const cardId of cardIds) {
    const currentCount = cardCounts.get(cardId) ?? 0;
    cardCounts.set(cardId, currentCount + 1);
  }

  if (cardCounts.size === 0) return;

  const values = Prisma.join(
    Array.from(
      cardCounts,
      ([cardId, amount]) => Prisma.sql`(${userId}, ${cardId}, ${amount}, true)`,
    ),
  );

  await prisma.$executeRaw`
    INSERT INTO "UserCard" ("userId", "cardId", "amount", "isNew")
    values ${values}
    ON CONFLICT ("userId", "cardId")
    DO UPDATE SET 
      "amount" = "UserCard"."amount" + EXCLUDED."amount"
  `;
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
  const result = await prisma.user.updateMany({
    where: {
      id: userId,
      points: { gte: cost },
    },
    data: {
      points: { decrement: cost },
    },
  });
  if (result.count > 0) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) throw new Error("ユーザーが存在しません");
  throw new Error("ポイントが不足しています");
}

export async function drawTenGacha(userId: string) {
  // Measurement of processing time (20261011)
  const totalStart = performance.now();

  // 600ms
  let start = performance.now();
  await consumePoint(userId, 20);
  console.log("consumePoint:", (performance.now() - start).toFixed(1), "ms");

  // 200ms
  start = performance.now();
  const allCards = await prisma.card.findMany();
  console.log("findMany:", (performance.now() - start).toFixed(1), "ms");

  start = performance.now();

  // 10枚全て抽選する
  const cards: Card[] = [];
  for (let i = 0; i < 10; i++) {
    cards.push(drawCard(allCards));
  }
  console.log("draw: ", (performance.now() - start).toFixed(1), "ms");

  // まとめてDBに保存する
  start = performance.now();
  await saveUserCardsBulk(
    userId,
    cards.map((card) => card.id),
  );
  console.log(
    "saveUserCardsBulk: ",
    (performance.now() - start).toFixed(1),
    "ms",
  );

  eventEmitter.emit("gacha.completed", {
    userId,
    gachaType: "ten",
    cards,
  });
  console.log("eventEmitter:", (performance.now() - start).toFixed(1), "ms");

  console.log("total:", (performance.now() - totalStart).toFixed(1), "ms");
  return { cards };
}
