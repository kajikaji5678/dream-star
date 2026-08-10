import { prisma } from "../prisma.js";

export async function drawCard() {
  const cards = await prisma.card.findMany();
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
  if (85 <= random && random < 96.32) return "R" ;
  if (96.32 <= random && random < 99.32) return "DREAM";
  if (99.32 <= random && random < 99.92) return "DR";
  if (99.92 <= random) return "GXR";
}

export async function saveUserCard(userId: string, cardId: number) {
  const userCard = await prisma.userCard.findFirst({
    where: {
      userId,
      cardId,
    },
  });

  if (userCard) {
    await prisma.userCard.update({
      where: {
        id: userCard.id,
      },
      data: {
        amount: {
          increment: 1
        }
      }
    });

    return;
  }

  await prisma.userCard.create({
    data: {
      userId,
      cardId,
      isNew: true,
    },
  });
}

export async function consumePoint(userId: string, cost: number) {
  const user = await prisma.user.findUnique({where: {id: userId}});
  if (!user) throw new Error("ユーザーが存在しません");
  if (user.points < cost) throw new Error ("ポイントが不足しています");

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      points: {
        decrement: cost,
      },
    }
  });
}