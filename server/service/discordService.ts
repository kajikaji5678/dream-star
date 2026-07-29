import { PrismaClient } from "../generated/prisma/index.js";

type TokenRes = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

type UserRes = {
  id: string;
  username: string;
  avatar: string | null;
};

export async function getDiscordUser(code: string) {
  const prisma = new PrismaClient();
  // アクセストークン取得
  const tokenRes = await fetch(
    "https://discord.com/api/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      }),
    }
  );

  const tokenData = (await tokenRes.json()) as TokenRes;

  if (!tokenRes.ok) {
    throw new Error(`Discord token error: ${JSON.stringify(tokenData)}`);
  }

  // ユーザー情報取得
  const userRes = await fetch(
    "https://discord.com/api/users/@me",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const userData = (await userRes.json()) as UserRes;

  if (!userRes.ok) {
    throw new Error(`Discord user error: ${JSON.stringify(userData)}`);
  }

  const user = await prisma.user.upsert({
    where: {
      id: userData.id,
    },
    update: {},
    create: {
      id: userData.id,
    },
  });

  return {
    accessToken: tokenData.access_token,
    user
  };
}