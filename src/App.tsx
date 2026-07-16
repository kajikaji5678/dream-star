import { useEffect } from "react";
import { discordSdk } from "./discord";

export default function App() {
    useEffect(() => {

        const isDiscordActivity = new URLSearchParams(
            window.location.search
        ).has("frame_id");

        if (isDiscordActivity) {
            console.log("Running outside Discord Activity");
            return;
        }

        async function connect() {
            try {
                if (!discordSdk) return;
                await discordSdk.ready();
                console.log("Discord Activity Connected");
            } catch (e) {
                console.log(e);
            }
        }

        connect();
    }, []);

    return <h1>Dream-Ster</h1>
}