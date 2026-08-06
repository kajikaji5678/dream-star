import { useEffect, useState } from "react";
import { connectDiscord } from "../service/discord";

export default function useDiscord() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("認証中");

  useEffect(() => {
    async function connect() {
      try { setProgress(20);
      setMsg("認証しています");
      const data = await connectDiscord();
      setProgress(100);
      setMsg("完了！");
      setUser(data.user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    connect()
  }, []);

  return{
    user,
    loading,
    progress,
    msg
  };
}