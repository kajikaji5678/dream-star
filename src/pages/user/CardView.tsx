import type { Card } from "@/types/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardView.css";
import Tilt from "react-parallax-tilt";

export default function CardView() {
  const { id } = useParams<{ id: string }>();
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
    <Tilt
      tiltMaxAngleY={15}
      tiltMaxAngleX={15}
      perspective={800}
      scale={1.05}
      transitionSpeed={1000}
      glareMaxOpacity={0.3}
    >
      <div className="h-full w-full flex items-center justify-center p-6">
        <div
          className="card-wrapper"
        >
          <img
            src={card.imageUrl}
            className="detail-card"
          />
          <div className="card-shine" />
        </div>
      </div>
    </Tilt>
  )
}