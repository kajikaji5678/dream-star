import { prisma } from "../prisma.js";

export class AchievementService {
  async checkAchievement(userId: string): Promise<void> {
    const achievement = await prisma.achievement.findMany({
      where: {
        isActive: true,
      },
    });

    for (const achievement of achievements) {
      const alreadyunlocked = await prisma.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id,
          },
        },
      });
    }
  }
}
