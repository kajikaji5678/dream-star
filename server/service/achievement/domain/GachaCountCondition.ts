// ガチャ回数という条件のルール担当
import { AchievementRepository } from "../infrastructure/AchievementRepository.js";

export class GachaCountCondition {
  constructor(private repository: AchievementRepository) {}

  async check(userId: string, conditionValue: number | null): Promise<boolean> {
    if (conditionValue === null) return false;
    const gachaCount = await this.repository.getGachaCount(userId);
    return gachaCount >= conditionValue;
  }
}

export type UnlockedAchievement = {
  id: number;
  key: string;
  name: string;
  description: string | null;
};
