import { useEffect, useState } from "react";
import { discordSdk } from "./discord";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import GachaOpening from "./pages/GachaOpening";
import Result from "./pages/Result";

console.log("App.tsx Start");

export default function App() {

  const [logs, setLogs] = useState<string[]>([]);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    avatar: string | null;
  } | null>(null);

  function addLog(msg: string) {
    setLogs((prevLogs) => {
      return [...prevLogs, msg]
    });
  }

  useEffect(() => {

    const isDiscordActivity = new URLSearchParams(
      window.location.search
    ).has("frame_id");

    if (!isDiscordActivity) {
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


        const res = await fetch("/api/auth/discord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            code: auth.code,
          }),
        });

        addLog("fetch done");

        const data = await res.json();
        setUser(data);
        addLog(`response ${JSON.stringify(data)}`);

      } catch (e) {
        console.log(e);
      }
    }

    connect();
  }, []);

  return (
    <>
    <div className="text-4xl">
      {logs.map((log, index) => (<div key={index}>{log}</div>))}
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user ?? undefined}/>} />
          <Route path="/gacha" element={<Gacha />} />
          <Route path="/gacha/opening" element={<GachaOpening />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}