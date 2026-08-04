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

  if (random <= 75) return "C";
  if (75 < random && random < 95) return "R";
  if (95 <= random) return "DREAM" ;
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
    },
  });
}