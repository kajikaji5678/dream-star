import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import "./GachaOpening.css";
import { useLocation } from "react-router-dom";
import SingleGachaCard from "../components/SingleGacha";
import TenGachaCard from "../components/TenGacha";

export default function GachaOpening() {
  const [phase, setPhase] = useState<"pack" | "slide" | "card" | "cut">("pack");
  const navigate = useNavigate();
  const location = useLocation();
  const {type, card, cards} = location.state ?? {};
  const isTenGacha = type === "ten";

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setPhase("slide");
    }, 1000);

    const cardTimer = setTimeout(() => {
      setPhase("card");
    }, 2000);

    const cutTimer = setTimeout(() => {
      setPhase("cut");
    }, 3000);

    const naviTimer = setTimeout(() => {
      navigate("/result", {
        state: isTenGacha 
          ? {type : "ten", cards}
          : {type: "single", card}
      })
    }, 4000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(cardTimer);
      clearTimeout(cutTimer)
      clearTimeout(naviTimer);
    }
  }, [navigate, card, isTenGacha, cards]);
  return (

    <>
    {/* デバック用 */}
      {/* <pre className="fixed top-0 left-0 z-50 bg-black text-white p-4">
        {JSON.stringify(card, null, 2)}
      </pre> */}
      {(phase === "pack" || phase === "slide") && (
        <div className={`h-screen pack-screen ${phase === "slide" ? "slide" : ""}`}>
          <Layout>
            <div className="flex h-full items-center justify-center text-4xl font-bold">
              Opening...
            </div>
          </Layout>
        </div>
      )}
      {(phase === "card" || phase === "cut") && (
        <>
          {isTenGacha ? (
            <TenGachaCard phase={phase}/>
          ) : (
            <SingleGachaCard phase={phase}/>
          )}
        </>
      )}
    </>


  )
}