import { useEffect, useState } from "react";
import { authenticateDiscord, authorizeDiscord, loginDiscord, readyDiscord } from "../service/discord";


export default function useDiscord() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("認証中");

  useEffect(() => {
    async function connect() {
      try {
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