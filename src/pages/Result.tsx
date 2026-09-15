import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css"
import { TestSmokeCanvasRight } from "@/components/test/TestSmoke";
import type { Card } from "@/types/card";

export default function Result() {

  const navigate = useNavigate();
  const location = useLocation();
  const {type, card, cards} = location.state ?? {};
  const isTenGacha = type === "ten";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(!isTenGacha);
  const testImage = "/public/menuCardImages/Dr.srone.png"

  useEffect(() => {
    if (!isTenGacha) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => clearTimeout(timer);
    }
    const preloadImages = async () => {
      await Promise.all(
        cards.map((card: Card) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = card.imageUrl;
          });
        })
      );

      setIsReady(true);
    }
    preloadImages();
  }, [isTenGacha, navigate, cards]);

  useEffect(() => {
    if (!isTenGacha || !isReady) return;
    const timer = setTimeout(() => {
      if (currentIndex >= cards.length - 1) {
        navigate("/");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isTenGacha, navigate, cards, currentIndex, isReady])

  const displayCard = isTenGacha ? cards[currentIndex] : card;

  return (
    <div
      key={displayCard.id}
      className="result-screen flex flex-col"
    >
      <div className="result-card-wrapper">
        <TestSmokeCanvasRight
          rarity={displayCard.rarity}
        />
        {/* <TestSmokeCanvasLeft /> */}
        <img src={displayCard.imageUrl} className="result-card" />
      </div>
      <p className="result-text mt-3 text-4xl">{displayCard.name}ゲット!</p>
    </div>
  );
} 