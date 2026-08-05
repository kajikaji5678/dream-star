import { prisma } from "../prisma.js";

export async function getUserPoints(id: string) {
  return await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      username: true,
      points: true
    },
  });
}