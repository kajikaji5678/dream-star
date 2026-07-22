import { useEffect } from "react";
import { discordSdk } from "./discord";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import GachaOpening from "./pages/GachaOpening";
import Result from "./pages/Result";

export default function App() {
    useEffect(() => {

        const isDiscordActivity = new URLSearchParams(
            window.location.search
        ).has("frame_id");

        if (!isDiscordActivity) {
            console.log("Running outside Discord Activity");
            return;
        }

        async function connect() {
            try {
                if (!discordSdk) return;
                await discordSdk.ready();

                const auth = await discordSdk.commands.authorize({
                    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
                    response_type: "code",
                    state: "",
                    prompt: "none",
                    scope: ["identify"],
                })
                console.log("Discord Activity Connected");
                console.log("Auth Code", auth.code);
            } catch (e) {
                console.log(e);
            }
        }

        connect();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gacha" element={<Gacha />} />
                <Route path="/gacha/opening" element={<GachaOpening />}/>
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    )
}