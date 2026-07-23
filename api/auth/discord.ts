import type { VercelRequest, VercelResponse } from "@vercel/node";


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { code } = req.body;

  if(!code) {
    return res.status(400).json({
      message: "Code is required",
    });
  }

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return res.status(400).json(tokenData);
  }

  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const userDate = await userResponse.json();

  if (!userResponse.ok) {
    return res.status(400).json(userDate);
  }

  return res.status(200).json({
    id: userDate.id,
    username: userDate.username,
    avatar: userDate.avatar
  });
}