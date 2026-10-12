import { AchievementService } from "./application/AchievementService.js";
import { GachaCountCondition } from "./domain/GachaCountCondition.js";
import { LoginStreakCondition } from "./domain/LoginStreakCondition.js";
import { AchievementRepository } from "./infrastructure/AchievementRepository.js";

const repositry = new AchievementRepository();
const loginStreakCondition = new LoginStreakCondition(repositry);
const gachaCoundCondition = new GachaCountCondition(repositry);

export const achievementService = new AchievementService(
  repositry,
  gachaCoundCondition,
  loginStreakCondition,
);
