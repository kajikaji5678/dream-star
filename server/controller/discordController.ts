import type { Request, Response } from "express";
import * as discordService from "../service/discordService.ts";

export function redirect(_req: Request, res: Response) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    scope: "identify",
  });

  res.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );
}

export async function callback(req: Request, res: Response) {
  const code = req.query.code;

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      error: "code is required",
    });
  }

  try {
    const user = await discordService.getDiscordUser(code);
    return res.json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "internal server error",
      detail: String(error),
    });
  }
}