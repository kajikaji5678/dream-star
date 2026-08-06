import Layout from "../layouts/Layout"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  user?: {
    id: string
    username: string
    avatar: string | null
  };
}

export default function Gacha({user}: Props) {
  const bgImage1 = "menuCardImages/cardOne.png";
  const bgImage2 = "menuCardImages/inventory.jpg";
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGacha = async () => {
    try {
      const res = await fetch("/api/gacha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id
        })
      });
      const card = await res.json();
      console.log(card);
      navigate("/gacha/opening", { state: { card } });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("予期せぬエラーが発生しました");
      }
    }
  }

  return (

    <>
      <Layout>
        <div className="h-full flex flex-col flex-1 gap-6">
          {error && (
            <p className="text-red-500 text-center font-bold">{error}</p>
          )}
          <div
            className="rounded-xl p-4 menu-card h-1/2 w-[90%] mx-auto bg-red-300 relative"
            onClick={handleGacha}>
            <span className="menu-title font-bold text-2xl">1回ガチャ</span>
            <div className="menu-background" style={{ backgroundImage: `url(${bgImage1})` }} ></div>
            <div className="menu-background"></div>
            <div className="menu-triangle" />
          </div>
          <div className="rounded-xl p-4  menu-card h-1/2 w-[90%] mx-auto bg-red-300 relative">
            <span className="menu-title font-bold text-2xl">10回ガチャ(近日公開)</span>
            <div className="menu-background" style={{ backgroundImage: `url(${bgImage2})` }} ></div>
            <div className="menu-background"></div>
            <div className="menu-triangle" />
          </div>
        </div>
      </Layout>
    </>
  )
}