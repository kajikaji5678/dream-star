import { prisma } from "../../../prisma.js";

export class AchievementRepository {
  async findActiveAchievements() {
    return prisma.achievement.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async findUserAchievement(userId: string, achievementId: number) {
    return prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId,
        },
      },
    });
  }

  async createUserAchievement(
    userId: string,
    achievementId: number,
  ): Promise<void> {
    await prisma.userAchievement.create({
      data: {
        userId,
        achievementId,
      },
    });
  }

  async getGachaCount(userId: string): Promise<number> {
    const result = await prisma.userCard.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount ?? 0;
  }
}
