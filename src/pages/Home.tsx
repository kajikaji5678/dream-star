import { useEffect, useState } from "react";
import Layout from "../layouts/Layout"
import UpdateTicker from "../components/UpdateTicker";

type Props = {
  user?: {
    id: string
    username: string
    avatar: string | null
  };
  debug?: string[];
}

export default function Home({ user, debug }: Props) {

  
  void debug;

  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${user.id}`);
        const data = await res.json();
        setPoints(data.points);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  }, [user])

  return (
    <>
      <Layout ticket={<UpdateTicker />}>
        <section className="rounded-lg basis-1/5 px-6 py-4 bg-[#2b2d31]">
          <h2 className="text-xl font-bold">プレーヤー情報</h2>
          <div className="flex">
            <div className="mt-4 font-bold">ユーザーネーム: {user?.username ?? "未ログイン"}</div>
            <div className="ml-4 py-4 px-8 font-bold">DP: {points}</div>
          </div>
        </section>

        <section className="rounded-lg mt-6 flex-1 px-6 py-4 bg-[#2b2d31]">
          <h2 className="text-xl font-bold">お気に入りカード</h2>
        </section>
      </Layout>
    </>
  )
}