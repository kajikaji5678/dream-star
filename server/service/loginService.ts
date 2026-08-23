import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getLoginBonusDGP(loginStreak: number) {
  if (loginStreak <= 3) return 2;
  if (loginStreak <= 6) return 4;
  return 6;
}

async function findUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      loginStreak: true,
      lastLoginDate: true,
    }
  });
}

export async function getLoginInfoService(userId: string) {
  const user = await findUser(userId);
  const today = getToday();

  const todayClaim = await prisma.loginBonusClaim.findUnique({
    where: {
      // 複合ユニークキー
      userId_loginDate: {
        userId,
        loginDate: today
      }
    }
  });

  return {
    loginStreak: user?.loginStreak,
    lastLoginDate: user?.lastLoginDate,
    todayClaimed: todayClaim !== null,
  }
}

export async function updateLoginInfoService(userId: string) {
  const user = await findUser(userId);
  const today = getToday();

  const todayClaim = await prisma.loginBonusClaim.findUnique({
    where: {
      userId_loginDate: {
        userId,
        loginDate: today
      }
    }
  });

  if (todayClaim) throw new Error("すでにログインしています");

  //! 一旦ここまで理解

  let loginStreak = 1;
  if (user?.lastLoginDate) {
    const lastLoginDate = new Date(user.lastLoginDate);
    lastLoginDate.setHours(0, 0, 0, 0);

    const diff = (today.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      loginStreak = user.loginStreak + 1;
    }
  }

  //~ トランザクションは複数DB処理を一度に実行すること
  const result = await prisma.$transaction(async (tx) => {
    // ユーザーが今日ログインボーナスを受け取った処理
    const claim = await tx.loginBonusClaim.create({
      data: {
        userId,
        loginDate: today
      }
    });

    const reward = getLoginBonusDGP(loginStreak);

    // 計算した連続ログイン日数と日付を更新 + DGP付与 処理
    const updateUser = await tx.user.update({
      where: {
        id: userId
      },
      data: {
        loginStreak,
        lastLoginDate: today,
        points: {
          increment: reward
        }
      },
      select: {
        loginStreak: true,
        lastLoginDate: true,
        points: true
      }
    });

    return {
      claim,
      user: updateUser,
      reward
    }
  });

  return {
    loginStreak: result.user.loginStreak,
    lastLoginDate: result.user.lastLoginDate,
    todayClaimed: true,
    reward: result.reward,
    points: result.user.points
  }
}
