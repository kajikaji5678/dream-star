import { discordSdk } from "../discord"

export async function readyDiscord() {
  if (!discordSdk) return;
  await discordSdk.ready();
}

export async function authorizeDiscord() {
  return await discordSdk!.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify"],
  });
}

export async function loginDiscord(code: string) {
  const res = await fetch("/api/auth/discord/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Fetch Error");
  }

  return await res.json();
}

export async function authenticateDiscord(accessToken: string) {
  await discordSdk!.commands.authenticate({
    access_token: accessToken,
  });
}