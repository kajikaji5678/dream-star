import {
  GachaCountCondition,
  type UnlockedAchievement,
} from "../domain/GachaCountCondition.js";
import { AchievementRepository } from "../infrastructure/AchievementRepository.js";

export class AchievementService {
  constructor(
    private repository: AchievementRepository,
    private gachaCountCondition: GachaCountCondition,
  ) {}
  async checkAchievements(userId: string): Promise<UnlockedAchievement[]> {
    const achievements = await this.repository.findActiveAchievements();

    const unlockedAchievements: UnlockedAchievement[] = [];
    // すでに解除していないかを実績の中から一つずつ確認
    for (const achievement of achievements) {
      const alreadyUnlocked = await this.repository.findUserAchievement(
        userId,
        achievement.id,
      );
      if (alreadyUnlocked) continue;

      // 最初は未達成とする
      let isCompleted = false;

      // 判定をインフラに繋げてDBを叩いてもらう
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

      unlockedAchievements.push({
        id: achievement.id,
        key: achievement.key,
        name: achievement.name,
        descrption: achievement.description,
      });
    }

    return unlockedAchievements;
  }
}
