import type { AchievementRepository } from "../infrastructure/AchievementRepository.ts";

export class LoginStreakCondition {
  constructor(private repositry: AchievementRepository) {}

  async check(userId: string, conditionValue: number | null): Promise<boolean> {
    if (conditionValue === null) return false;
    const loginStreak = await this.repositry.getLoginStreak(userId);
    return loginStreak >= conditionValue;
  }
}
