import { prisma } from "../prisma.ts";

const TOTAL_CARDS = 80;
export async function getCollectionRanking() {
  const userCards = await prisma.userCard.findMany({
    where: {
      amount: {
        gt: 0
      },
    },
    select: {
      userId: true,
      cardId: true
    },
  });

  const userCardMap = new Map<string, Set<number>>();

  for (const userCard of userCards) {
    if (!userCardMap.has(userCard.userId)) {
      userCardMap.set(userCard.userId, new Set());
    }
    userCardMap.get(userCard.userId)!.add(userCard.cardId);
  }

  const ranking = Array.from(userCardMap.entries())
    .map(([userId, cardIds]) => ({
      userId,
      ownedCount: cardIds.size,
      completionRate: Math.min(Math.round((cardIds.size / TOTAL_CARDS) * 100), 100)
    }))
    .sort((a,b) => {
      if (b.completionRate !== a.completionRate) {
        return b.completionRate - a.completionRate
      }
      return b.ownedCount - a.ownedCount
    })
    .slice(0, 5)
    .map((user, index) => ({
      rank: index + 1,
      ...user
    }));

  return ranking;
}