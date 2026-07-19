import { useNavigate } from "react-router-dom";

export default function HomeBack() {
  const navigate = useNavigate();

  return (
    <button className="rounded-xl px-6 py-3 font-bold bg-[#5865f2] text-white h-14
     hover:brightness-110 transition"
      onClick={() => navigate("/")}>
      ホームへ戻る
    </button>
  )
}