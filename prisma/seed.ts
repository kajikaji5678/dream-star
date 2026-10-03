import { PrismaClient } from "../server/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.achievement.createMany({
    data: [
      {
        name: "ガチャの処女は破られた",
        description: "ガチャを100回引く",
        conditionType: "GACHA_COUNT",
        conditionValue: 100,
        isActive: true,
        key: "gacha_count_100",
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
