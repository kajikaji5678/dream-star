import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button1 from "../components/button1";

const Admin_id = [
  "1450733147867185215"
]

type Props = {
  user?: {
    id: string;
    username: string;
    avatar: string | null;
  };
};

type Card = {
  id: number;
  name: string;
  imageUrl: string;
}

export default function Admin({ user }: Props) {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const isAdmin = user && Admin_id.includes(user.id);

  useEffect(() => {
    fetch("/api/cards/cards")
      .then((res) => res.json())
      .then((data) => { console.log("取得データ:", data); setCards(data) })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Layout>
        <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
          <div className="self-start px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
            <h1 className="font-bold">カード一覧</h1>
          </div>
          <div className="mt-4 flex-1 overflow-y-auto rounded">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 first:mt-0">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-lg bg-black/20 p-4 text-white"
                >
                  <img
                    src={card.imageUrl}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <p className="mt-3 text-center text-lg font-semibold">
                    {card.name}
                  </p>
                  <button
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => navigate(`/admin/cards/${card.id}`)}
                  >
                    編集する
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button1 to="/admin/cards/add">追加する</Button1>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}