import { useEffect, useState } from "react";
import { authenticateDiscord, authorizeDiscord, loginDiscord, readyDiscord } from "../service/discord";


export default function useDiscord() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("認証中");

  function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  useEffect(() => {
    async function connect() {
      try {
        setProgress(0);
        setMsg("Starting....");
        await sleep(2000);
        setProgress(10);
        setMsg("認証しています");
        await readyDiscord();
        setProgress(30);
        setMsg("許可中");
        const auth = await authorizeDiscord();
        setProgress(60);
        setMsg("Discodと接続しています");
        const data = await loginDiscord(auth.code);
        setProgress(90);
        setMsg("認証中")
        await authenticateDiscord(data.accessToken);
        setProgress(100);
        setMsg("完了!");
        setUser(data.user);
        await sleep(2500);
        setLoading(false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    connect()
  }, []);

  return {
    user,
    loading,
    progress,
    msg
  };
}