import type { Card } from "@/types/card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CardView.css";
import Tilt from "react-parallax-tilt";

export default function CardView() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const testCard = "/public/menuCardImages/Dr.srone.png";
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/cards/${id}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((e) => console.error(e));
  }, [id]);

  if (!card) return <div>Loading</div>

  return (
    <div className="h-full w-full flex items-center relative justify-center pt-12 overflow-hidden">
      <Tilt
        tiltMaxAngleY={15}
        tiltMaxAngleX={15}
        perspective={800}
        scale={1.05}
        transitionSpeed={1000}
        glareMaxOpacity={0.3}
      >
        <div
          className="card-wrapper"
        >
          <img
            src={testCard}
            className="detail-card"
          />
          <div className="card-shine" />
        </div>
      </Tilt>
      <div className="
          rounded-xl bg-sky-300 py-2 px-4 w-min absolute top-5 right-28
          transition-all duration-300
          hover:scale-105
          hover:ring-2
          hover:ring-offset-2"
          onClick={() => navigate(-1)}
      >
        <p>back</p>
      </div>
    </div>
  )
}