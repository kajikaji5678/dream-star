import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="h-16 flex bg-gradient-to-r from-purple-900 to-indigo-600 items-center px-6 border-b border-[#1e1f22]">
        <h1 className="text-2xl font-bold">DreamStar</h1>
        <div className="ml-auto flex gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-black/20 hover:bg-black/40 transition"
            onClick={() => navigate(-1)}>
            ← 戻る
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-black/20 hover:bg-black/40 transition"
            onClick={() => navigate("/")}>
            🏠 ホーム
          </button>
        </div>
      </header>
    </>
  )
}