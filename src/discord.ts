import { DiscordSDK } from "@discord/embedded-app-sdk";

const isDiscordActivity = new URLSearchParams(
    window.location.search
).has("frame_id");

export const discordSdk = isDiscordActivity
    ? new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID)
    : null;