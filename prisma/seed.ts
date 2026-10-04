import { PrismaClient } from "../server/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.achievement.createMany({
    data: [
      {
        name: "ガチャシルバー",
        description: "ガチャを300回引く",
        conditionType: "GACHA_COUNT",
        conditionValue: 300,
        isActive: true,
        key: "gacha_count_300",
      },
      {
        name: "ガチャゴールデン",
        description: "ガチャを1000回引く",
        conditionType: "GACHA_COUNT",
        conditionValue: 1000,
        isActive: true,
        key: "gacha_count_1000",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
