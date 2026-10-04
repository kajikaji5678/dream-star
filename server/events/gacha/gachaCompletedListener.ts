import { achievementService } from "../../service/achievement/index.ts";
import { eventEmitter } from "../eventEmitter.ts";
import type { GachaCompletedEvent } from "./type.ts";

export function registerGachaCompleteListener() {
  eventEmitter.on("gacha.completed", async (event: GachaCompletedEvent) => {
    await achievementService.checkAchievements(event.userId);
  });
}
