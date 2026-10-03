import { AchievementService } from "./application/AchievementService.js";
import { GachaCountCondition } from "./domain/GachaCountCondition.js";
import { AchievementRepository } from "./infrastructure/AchievementRepository.js";

const repositry = new AchievementRepository();

const gachaCoundCondition = new GachaCountCondition(repositry);

export const achievementService = new AchievementService(
  repositry,
  gachaCoundCondition,
);
