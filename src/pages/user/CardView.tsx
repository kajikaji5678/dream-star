import type { Card } from "@/types/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardView.css";

export default function CardView() {
  const id = useParams<{id: string}>();
  const [card, setCard] = useState<Card | null>(null);
  const testCard = "/public/menuCardImages/Dr.srone.png";

  useEffect(() => {
    if (!id) return;
    fetch(`/api/cards/${id}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((e) => console.error(e));
  }, [id]);

  if (!card) return <div>Loading</div>

  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <img
        src={testCard}
        className="detail-card" 
      />
    </div>
  )
}