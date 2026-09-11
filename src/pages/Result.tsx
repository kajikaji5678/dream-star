import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css"

type imageUrl = {
  image: string;
  name: string;
};

export default function Result() {

  const navigate = useNavigate();
  const location = useLocation();
  const { type, card, cards } = location.state ?? {};
  const isTenGacha = type === "ten";
  const [currentIndex, setCurrentIndex] = useState(0);
  const testImage = "/public/menuCardImages/Dr.srone.png";

  useEffect(() => {
    if (!isTenGacha) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (currentIndex >= cards.length - 1) {
        navigate("/");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 2500)
    return () => clearTimeout(timer);
  }, [isTenGacha, navigate, cards, currentIndex]);

  const displayCard: imageUrl = isTenGacha ? cards[currentIndex] : card;

  return (
    <div className="result-screen flex flex-col">
      <img
        key={currentIndex}
        src={displayCard.image}
        className="result-card">
      </img>
      <p className="result-text mt-10 text-4xl">{displayCard.name}ゲット!</p>
    </div>
  );
} 