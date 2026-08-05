import type { Request, Response } from "express";
import { getUserPoints } from "../service/userService.js";

export async function show(req: Request, res: Response) {
  try {
    const {id} = req.params;
    if (typeof id !== "string") return res.status(400).json({error: 400});
    const user = await getUserPoints(id);
    if (!user) return res.status(404).json({error: 400});
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({error: 500});
  }
}