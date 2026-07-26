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


router.post("/discord", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400);

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
        })
      }
    );

    const tokenData = await tokenRes.json() as TokenRes;
    if (!tokenRes.ok) return res.status(400);

    const userRes = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      }
    );

    const userData = await userRes.json() as UserRes;
    if (!userRes.ok) return res.status(400);

    return res.json({
      id: userData.id,
      username: userData.username,
      avatar: userData.avatar,
    });
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

console.log("discord routes registered");
export default router;


