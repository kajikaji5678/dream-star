import type { Request, Response } from "express";
import * as collectionService from "../service/rankingService.js"

export async function CollectionRanking(req: Request, res: Response) {
  console.log("🔥 CollectionRanking called");
  try {
    const ranking = await collectionService.getCollectionRanking();
    res.json(ranking);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "500" });
  }
}