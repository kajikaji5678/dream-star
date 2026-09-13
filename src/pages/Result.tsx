import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css"
import { TestSmokeCanvasRight } from "@/components/test/TestSmoke";

export default function Result() {

  const navigate = useNavigate();
  const location = useLocation();
  const { type, card, cards } = location.state ?? {};
  const isTenGacha = type === "ten";
  const [currentIndex, setCurrentIndex] = useState(0);
  const testImage = "/public/menuCardImages/Dr.srone.png"

  useEffect(() => {
    if (!isTenGacha) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 500000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (currentIndex >= cards.length - 1) {
        navigate("/");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000)
    return () => clearTimeout(timer);
  }, [isTenGacha, navigate, cards, currentIndex]);

  const displayCard = isTenGacha ? cards[currentIndex] : card;

  return (
    <div className="result-screen flex flex-col">
      <div className="result-card-wrapper">
        <TestSmokeCanvasRight />
        {/* <TestSmokeCanvasLeft /> */}
        <img src={testImage} className="result-card"></img>
      </div>
      <p className="result-text mt-5 text-4xl">ゲット!</p>
    </div>
  );
} 