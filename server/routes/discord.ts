import { Router } from "express";
const router = Router();

type TokenRes = {
  access_token: string;
}

type UserRes = {
  id: string;
  username: string;
  avatar: string | null;
}

router.get("/discord", (_req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    scope: "identify"
  });

  res.redirect(
    `https://discord.com/oauth2/authorize?${params}`
  );
})

router.get("/discord/callback", async (req, res) => {
  const code = req.query.code;

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      error: "code is required"
    });
  }

  try {
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
        })
      }
    );

    const tokenData = await tokenRes.json() as TokenRes;

    if (!tokenRes.ok) {
      return res.status(400).json({
        error: "discord token error",
        detail: tokenData,
      });
    }

    const userRes = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      }
    );

    const userData = await userRes.json() as UserRes;

    if (!userRes.ok) {
      return res.status(400).json({
        error: "discord user error",
        detail: userData,
      });
    }

    return res.json({
      id: userData.id,
      username: userData.username,
      avatar: userData.avatar,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "internal server error",
      detail: String(e),
    });
  }
});



console.log("discord routes registered");
export default router;
