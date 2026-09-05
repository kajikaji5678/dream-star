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

  const baseRanking = Array.from(userCardMap.entries())
    .map(([userId, cardIds]) => ({
      userId,
      ownedCount: cardIds.size,
      completionRate: Math.min(Math.round((cardIds.size / TOTAL_CARDS) * 100), 100)
    }))
    .sort((a, b) => {
      if (b.completionRate !== a.completionRate) {
        return b.completionRate - a.completionRate
      }
      return b.ownedCount - a.ownedCount
    })
    .slice(0, 5)

  // ランキングに入ったユーザーの情報をDBから取得
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: baseRanking.map((user) => user.userId)
      }
    },
    select: {
      id: true,
      username: true,
      avatar: true
    }
  });

  const userMap = new Map(users.map((user) => [user.id, user]));

  const ranking = baseRanking.map((user, index) => {
    const discordUser = userMap.get(user.userId);
    let avatarUrl: string | null = null;
    if (discordUser?.avatar) { avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`; }

    return {
      ranl: index + 1,
      userId: user.userId,
      username: discordUser?.username ?? "unknown",
      avater: avatarUrl,
      ownedCount: user.ownedCount,
      completionRate: user.completionRate
    }
  })

  return ranking;
}