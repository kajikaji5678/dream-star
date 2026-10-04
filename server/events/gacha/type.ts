import type { Card } from "../../generated/prisma/index.js";

export type GachaCompletedEvent = {
  userId: string;
  gachaType: "single" | "ten";
  cards: Card[];
};
