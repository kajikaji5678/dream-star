import { discordSdk } from "../discord"

export async function connectDiscord() {
  if (!discordSdk) throw new Error("SDK isnt initialized");
  await discordSdk.ready();

  const auth = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify"],
  });

  const res = await fetch("/api/auth/discord/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: auth.code,
    }),
  });

  if (!res.ok) {
    throw new Error("Fetch Error");
  }

  const data = await res.json();

  await discordSdk.commands.authenticate({
    access_token: data.accessToken,
  });

  return data;
}