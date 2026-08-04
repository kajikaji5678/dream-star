import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css"

export default function Result() {

  const navigate = useNavigate();
  const location = useLocation();
  const card = location.state?.card;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return() => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="result-screen flex flex-col">
      <img src={card.imageUrl} className="result-card"></img>
      <p className="result-text mt-10 text-4xl">{card.name}ゲット!</p>
    </div>
  );
} 