import { useEffect, useState } from "react";
import { discordSdk } from "./discord";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import GachaOpening from "./pages/GachaOpening";
import Result from "./pages/Result";

console.log("App.tsx Start");

export default function App() {
  const [status, setStatus] = useState("App start");

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
        setStatus("before ready");

        await discordSdk.ready();
        setStatus("ready done");

        const auth = await discordSdk.commands.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          state: "",
          prompt: "none",
          scope: ["identify"],
        })

        setStatus(`auth done: ${auth.code}`);

        const res = await fetch("/api/auth/discord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            code: auth.code,
          }),
        });

        console.log("4: fetch done");

        const data = await res.json();
        console.log("5: response", data);
      } catch (e) {
        console.log(e);
      }
    }

    connect();
  }, []);

  return (
    <>
    <div className="text-4xl">
      TEST
      <br />
      {status}
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gacha" element={<Gacha />} />
          <Route path="/gacha/opening" element={<GachaOpening />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}