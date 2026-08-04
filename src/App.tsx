import { useEffect, useState } from "react";
import { discordSdk } from "./discord";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gacha from "./pages/Gacha";
import GachaOpening from "./pages/GachaOpening";
import Result from "./pages/Result";
import Admin from "./pages/Admin";
import CardEdit from "./pages/admin/CardEdit";
import CardAdd from "./pages/admin/CardAdd";
import UserCardList from "./pages/UserCardList";

console.log("App.tsx Start");

export default function App() {
  //* デバック用
  const [debug, setDebug] = useState<string[]>([]);


  const [user, setUser] = useState<{
    id: string;
    username: string;
    avatar: string | null;
  } | null>(null);

  useEffect(() => {

    // const isDiscordActivity = new URLSearchParams(
    //   window.location.search
    // ).has("frame_id");

    // if (!isDiscordActivity) {
    //   return;
    // }

    async function connect() {
      try {
        if (!discordSdk) {
          return
        };

        await discordSdk.ready();

        // setDebug(prev => [...prev, "auth"]);
        const auth = await discordSdk.commands.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          state: "",
          prompt: "none",
          scope: ["identify"],
        })

        // setDebug(prev => [...prev, `code取得: ${auth.code ? "成功": "失敗"}`]);

        setDebug(prev => [...prev, "fetch開始"]);
        const res = await fetch("/api/auth/discord/activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            code: auth.code,
          }),
        });
        setDebug(prev => [...prev, `fetch終了 status:${res.status}`]);

        // const errorData = await res.json();
        // setDebug(prev => [...prev, `エラー内容: ${JSON.stringify(errorData)}`]);

        if (!res.ok) {
          throw new Error("fetch Error");
        }

        setDebug(prev => [...prev, "data"]);
        const data = await res.json();

        setDebug(prev => [
          ...prev,
          `accessToken:${data.accessToken ? "あり" : "なし"}`
        ]);

        await discordSdk.commands.authenticate({
          access_token: data.accessToken,
        });

        setUser(data.user);

      } catch (e) {
        console.log(e);
        setDebug(prev => [...prev, `${e}`]);
      }
    }

    connect();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user ?? undefined} debug={debug}/>} />
          <Route path="/gacha" element={<Gacha user={user ?? undefined}/>} />
          <Route path="/gacha/opening" element={<GachaOpening />} />
          <Route path="/result" element={<Result />} />
          <Route path="/admin" element={<Admin user={user ?? undefined} />} />
          <Route path="/admin/cards/:id" element={<CardEdit />} />
          <Route path="/admin/cards/add" element={<CardAdd />} />
          <Route path="/cardlist" element={<UserCardList/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}