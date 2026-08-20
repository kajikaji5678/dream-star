import type { Request, Response } from "express";
import { getLoginInfoService, updateLoginInfo } from "../service/loginService.js";

export const getLoginInfo = async (req: Request, res: Response) => {

  const { userId } = req.params;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: 400 });
  }

  try {
    const result = await getLoginInfoService(userId);
    if (!result) {
      return res.status(404).json({ message: 404 });
    }
    return res.status(200).json(result)
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 500 });
  }
}

export async function updateLogin(req: Request, res: Response) {
  try {
    const userId = req.params;
    if (userId) return res.status(400).json({message: 400});

    const claim = await updateLoginInfo(userId);
    return res.status(200).json({message: "ログイン情報を更新", claim});
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: 500});
  }
}