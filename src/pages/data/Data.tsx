import LiquidGraph from "@/components/animation/LiquidGraph";
import Layout from "@/layouts/Layout";
import type { User } from "@/types/ user";
import { motion } from "framer-motion"
import { useState, useEffect } from "react";

type Rarity = "C" | "SP" | "R" | "DREAM" | "DR" | "GXR";

type RankingItem = {
  rank: number;
  userId: string;
  username: string;
  avatar: string | null;
  ownedCount: number;
  completionRate: number;
};

const rarityStyle: Record<Rarity, string> = {
  C: "bg-gray-400",
  SP: "bg-blue-400",
  R: "bg-purple-400",
  DREAM: "bg-yellow-400",
  DR: "bg-pink-400",
  GXR: "bg-pink-400",
};

const rarities: Rarity[] = [
  "C",
  "SP",
  "R",
  "DREAM",
  "DR",
  "GXR"
]

const rarityTotal: Record<Rarity, number> = {
  C: 34,
  SP: 16,
  R: 9,
  DREAM: 10,
  DR: 9,
  GXR: 2
}

export default function Data({ user }: User) {

  const [completionRate, setCompletionRate] = useState(0);
  const [rarityProgress, setRarityProgress] = useState<Record<Rarity, number>>({
    C:0, 
    SP: 0,
    R: 0,
    DREAM: 0,
    DR: 0,
    GXR: 0
  });
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const res = await fetch(import.meta.env.DEV ? `/api/cards/user/1450733147867185215` : `/api/cards/user/${user?.id}`);
        if (!res.ok) throw new Error("カード情報の取得失敗");
        const cards: { id: number; amount: number; rarity:Rarity }[] = await res.json();
        const ownedCount = new Set(cards.filter((card) => card.amount > 0).map((card) => card.id)).size;
        const rate = Math.min(Math.round((ownedCount / 80) * 100), 100);
        setCompletionRate(rate);
        const calucrateProgress: Record<Rarity, number> = {
          C: 0,
          SP: 0,
          R: 0,
          DREAM: 0,
          DR: 0,
          GXR: 0
        };
        rarities.forEach((rarity) => {
          const ownedRarityCount = new Set(cards.filter((card) => card.rarity === rarity && card.amount > 0).map((card) => card.id)).size; 
          calucrateProgress[rarity] = Math.min(Math.round((ownedRarityCount / rarityTotal[rarity]) * 100), 100);
        });
        setRarityProgress(calucrateProgress);
      } catch (e) {
        console.error(e);
      }
    };
    if (user?.id) fetchUserCards();
  }, [user?.id]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch("/api/ranking");
        if (!res.ok) throw new Error("ランキング情報の取得失敗");
        const data: RankingItem[] = await res.json();
        setRanking(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchRanking();
  }, [])

  return (
    <Layout>
      <section className="rounded-lg h-full flex flex-col px-6 py-4 bg-[#2b2d31]">
        <div className="self-start px-4 py-2 mb-4 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
          <h1 className="font-bold">ユーザーデータ</h1>
        </div>
        <div className="lg:flex lg:gap-4 bg-transparent overflow-y-auto">
          <div className="lg:flex-1 relative h-[180px] p-4 bg-[#313338]">
            <LiquidGraph value={completionRate}></LiquidGraph>
            <p className="absolute top-[70px] left-[170px]">
              図鑑達成率は<span className="font-bold">{completionRate}</span>です。
            </p>
          </div>
          <div className="lg:flex-1 mt-4 lg:mt-0 px-4 py-2 bg-[#313338]">
            {rarities.map((rarity) => (
              <div key={rarity} className="flex mt-1 items-center gap-2">
                <span className="w-14 text-sm text-white">
                  {rarity}
                </span>
                <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-gray-700">
                  <motion.div
                    className={`h-full rounded-full ${rarityStyle[rarity]}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${rarityProgress[rarity]}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }} />
                </div>
              </div>))}
          </div>
        </div>
        <div className="bg-[#313338] space-y-2 px-4 py-2">
          <p className="font-bold text-lg">図鑑達成率ランキング</p>
          {ranking.map((item) => (
            <div className="flex items-center gap-3 rounded-md py-2" key={item.rank}>
              <span className={`w-8 text-center font-bold ${item.rank === 1
                ? "text-yellow-400"
                : item.rank === 2
                  ? "text-gray-300"
                  : item.rank === 3
                    ? "text-orange-300"
                    : "text-gray-500"
                }`}
              >
                {item.rank}
              </span>
              {item.avatar ? (
                <img src={item.avatar} className="h-9 w-9 rounded-full object-cover"></img>
              ) : (
                <div className="h-9 w-9 rounded-full bg-gray-600"></div>
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold">
                  {item.username}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-gray-700">
                    <motion.div
                      className="h-full rounded-full bg-sky-400"
                      initial={{ width: "0%" }}
                      animate={{ width: `${item.completionRate}%` }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-bold">
                    {item.completionRate}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}