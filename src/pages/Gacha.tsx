import Layout from "../layouts/Layout"
import { useNavigate } from "react-router-dom";

export default function Gacha() {
  const bgImage1 = "menuCardImages/cardOne.png";
  const bgImage2 = "menuCardImages/inventory.jpg"
  const navigate = useNavigate();
  return (

    <>
      <Layout>
        <div className="h-full flex flex-col flex-1 gap-6">
          <div className="rounded-xl p-4 menu-card h-1/2 w-4/5 mx-auto bg-red-300 relative" onClick={() => navigate("/gacha/opening")}>
            <span className="menu-title font-bold text-2xl">1回ガチャ</span>
            <div className="menu-background" style={{ backgroundImage: `url(${bgImage1})` }} ></div>
            <div className="menu-background"></div>
            <div className="menu-triangle" />
          </div>
          <div className="rounded-xl p-4  menu-card h-1/2 w-4/5 mx-auto bg-red-300 relative">
            <span className="menu-title font-bold text-2xl">10回ガチャ</span>
            <div className="menu-background" style={{ backgroundImage: `url(${bgImage2})` }} ></div>
            <div className="menu-background"></div>
            <div className="menu-triangle" />
          </div>
        </div>
      </Layout>
    </>
  )
}