import { PrismaClient } from "../server/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.achievement.createMany({
    data: [
      {
        name: "連続ログインブロンズ",
        key: "gacha_login_7",
        description: "連続ログイン7日目だ、ありがたい",
        conditionType: "GACHA_LOGIN",
        conditionValue: 7,
      },
      {
        name: "連続ログインシルバー",
        key: "gacha_login_14",
        description: "連続ログイン14日目だ、ありがたい",
        conditionType: "GACHA_LOGIN",
        conditionValue: 14,
      },
      {
        name: "連続ログインゴールド",
        key: "gacha_login_31",
        description: "連続ログイン31日目だ、ありがたい",
        conditionType: "GACHA_LOGIN",
        conditionValue: 31,
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
