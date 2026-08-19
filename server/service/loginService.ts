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

  return user;
}