import LiquidGraph from "@/components/animation/LiquidGraph";
import Layout from "@/layouts/Layout";
import type { User } from "@/types/ user";
import { motion } from "framer-motion"
import { useState, useEffect } from "react";

type Rarity = "C" | "SP" | "R" | "DREAM" | "DR" | "GXR";


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

const progress: Record<Rarity, number> = {
  C: 80,
  SP: 60,
  R: 45,
  DREAM: 30,
  DR: 20,
  GXR: 10,
};

export default function Data({ user }: User) {

  const [completionRate, setCompletionRate] = useState(0);
  const [rarityProgress, setRarityProgress] = useState<Record<Rarity, number>>({
    C:0, 
    SP: 0,
    R: 0,
    DREAM: 0,
    DR: 0,
    GXR: 0
  })

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
      </section>
    </Layout>
  )
}