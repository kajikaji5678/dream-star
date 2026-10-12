import { achievementService } from "../../service/achievement/index.js";
import { eventEmitter } from "../eventEmitter.js";
import type { GachaCompletedEvent } from "./type.ts";

export function registerGachaCompleteListener() {
  eventEmitter.on("gacha.completed", async (event: GachaCompletedEvent) => {
    await achievementService.checkAchievements(event.userId);
  });
}
