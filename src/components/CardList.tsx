import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Card } from "../types/card";
import { useCardFilter } from "@/context/useCardfilter";

// 一般ユーザーと管理者も一覧画面は同じコンポーネントを使用するため
// 初期値falseで管理者ページでtrueにさせる
type Props = {
  editable?: boolean;
  endpoint: string;
}

type CardWithAmout = Card & {
  amount: number
  isNew: boolean
};

type Rarity = "C" | "SP" | "R" | "DREAM" | "DR" | "GXR";

const rarityStyle: Record<Rarity, string> = {
  C: "border-gray-400",
  SP: "border-blue-400",
  R: "border-purple-400",
  DREAM: "border-yellow-400",
  DR: "border-pink-400",
  GXR: "border-pink-400",
};

const rarityOrder: Record<Rarity, number> = {
  C: 1,
  SP: 2,
  R: 3,
  DREAM: 4,
  DR: 5,
  GXR: 6
}

export default function CardList({ editable = false, endpoint }: Props) {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardWithAmout[]>([]);

  const { sort, rarity } = useCardFilter();

  const sortedCards = [...cards].sort((a, b) => {
    if (rarity === "rarity-desc") {
      const rarityDiff = rarityOrder[b.rarity as Rarity] - rarityOrder[a.rarity as Rarity];
      if (rarityDiff !== 0) return rarityDiff;
    };
    if (rarity === "rarity-asc") {
      const rarityDiff = rarityOrder[a.rarity as Rarity] - rarityOrder[b.rarity as Rarity];
      if (rarityDiff !== 0) return rarityDiff;
    };
    if (sort === "owned-desc") return b.amount - a.amount;
    if (sort === "owned-asc") return a.amount - b.amount;
    return 0;
  })

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((e) => console.log(e));
  }, [endpoint]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 first:mt-0">
      {sortedCards.map((card) => (
        <div
          key={card.id}
          className={`rounded-lg border-2 bg-black/20 p-4 text-white ${rarityStyle[card.rarity as Rarity]}`}
        >
          {card.isNew && (
            <span className="rounded bg-red-500 px-2 py-1 text-sm font-bold">
              New
            </span>
          )}
          <img
            src={card.imageUrl}
            className="w-full aspect-square object-cover rounded-lg"
          />

          <p className="mt-3 text-center text-lg font-semibold">
            {card.name}
          </p>
          {card.amount !== undefined && (
            <p className="mt-3 text-center text-lg font-semibold">
              所持枚数 ×{card.amount}
            </p>
          )}

          {editable && (
            <button
              className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => navigate(`/admin/cards/${card.id}`)}
            >
              編集する
            </button>
          )}
        </div>
      ))}
    </div>
  )
}