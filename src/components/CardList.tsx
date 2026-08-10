import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Card } from "../types/card";

// 一般ユーザーと管理者も一覧画面は同じコンポーネントを使用するため
// 初期値falseで管理者ページでtrueにさせる
type Props = {
  editable?: boolean;
  endpoint: string;
}

type CardWithAmout = Card & {
  amount?: number
  isNew?: boolean
};

const rarityStyle = {
  C: "border-gray-400",
  SP: "border-blue-400",
  R: "border-purple-400",
  DREAM: "border-yellow-400",
  DR: "border-pink-400",
  GXR: "border-pink-400",
};

export default function CardList({ editable = false, endpoint }: Props) {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardWithAmout[]>([]);

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
      {cards.map((card) => (
        <div
          key={card.id}
          className={`rounded-lg bg-black/20 p-4 text-white ${rarityStyle[card.rarity]}`}
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