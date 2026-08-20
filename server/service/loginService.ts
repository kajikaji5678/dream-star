import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function getLoginInfoService(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      loginStreak: true,
      lastLoginDate: true,
    }
  });

  const today = new Date();
  today.setHours(0,0,0,0);

  const todayClaim = await prisma.loginBonusClaim.findUnique({
    where: {
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

export async function updateLogin(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      loginStreak: true,
      lastLoginDate: true
    }
  });

  const today = new Date();
  today.setHours(0,0,0,0);

  const todayClaim = await prisma.loginBonusClaim.findUnique({
    where: {
      userId_loginDate: {
        userId,
        loginDate: today
      }
    }
  });

  if (todayClaim) throw new Error("すでにログインしています");

  let loginStreak = 1;
  if (user?.lastLoginDate) {
    const lastLoginDate = new Date(user.lastLoginDate);
    lastLoginDate.setHours(0,0,0,0);

    const diff = (today.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      loginStreak = user.loginStreak + 1;
    }
  }

  const result = await prisma.$transaction(async (tx) => {
    const claim = await tx.loginBonusClaim.create({
      data: {
        userId,
        loginDate: today
      }
    });

    const updateUser = await tx.user.update({
      where: {
        id: userId
      },
      data: {
        loginStreak,
        lastLoginDate: today
      },
      select: {
        loginStreak: true,
        lastLoginDate: true
      }
    });

    return {
      claim,
      user: updateUser
    }
  });

  return {
    loginStreak: result.user.loginStreak,
    lastLoginDate: result.user.lastLoginDate,
    todayClaimed: true,
  }
}
