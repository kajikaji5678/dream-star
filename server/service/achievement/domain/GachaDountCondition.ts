import { AchievementRepository } from "../infrastructure/AchievementRepository.ts";

export class GachaCountCondition {
  constructor(private repository: AchievementRepository) {}

  async check(userId: string, conditionValue: number | null): Promise<boolean> {
    if (conditionValue === null) return false;
    const gachaCount = await this.repository.getGachaCount(userId);
    return gachaCount >= conditionValue;
  }
}
