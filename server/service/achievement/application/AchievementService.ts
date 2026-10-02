import { GachaCountCondition } from "../domain/GachaDountCondition.ts";
import { AchievementRepository } from "../infrastructure/AchievementRepository.ts";

export class AchievementService {
  private repository: AchievementRepository;
  private gachaCountCondition: GachaCountCondition;

  constructor() {
    this.repository = new AchievementRepository();
    this.gachaCountCondition = new GachaCountCondition(this.repository);
  }

  async checkAchievements(userId: string): Promise<void> {
    const achievements = await this.repository.findActiveAchievements();

    for (const achievement of achievements) {
      const alreadyUnlocked = await this.repository.findUserAchievement(
        userId,
        achievement.id,
      );
      if (alreadyUnlocked) return;

      let isCompleted = false;

      switch (achievement.conditionType) {
        case "GACHA_COUNT":
          isCompleted = await this.gachaCountCondition.check(
            userId,
            achievement.conditionValue,
          );
          break;
      }

      if (!isCompleted) continue;

      await this.repository.createUserAchievement(userId, achievement.id);
    }
  }
}
