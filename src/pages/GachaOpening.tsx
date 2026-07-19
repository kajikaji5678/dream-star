import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import "./GachaOpening.css"

export default function GachaOpening() {
  const [phase, setPhase] = useState<"pack" | "slide" | "card" | "cut">("pack");
  const navigate = useNavigate();

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
      navigate("/result")
    }, 4000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(cardTimer);
      clearTimeout(cutTimer)
      clearTimeout(naviTimer);
    }
  }, [navigate]);
  return (

    <>
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
        <div className="fixed inset-0 flex items-center justify-center">
          <div className={`card-cut ${phase === "cut" ? "cut" : ""}`}>
            <img className="card-top" src="/menuCardImages/densetu-rieki.png"></img>
            <img className="card-bottom" src="/menuCardImages/densetu-rieki.png"></img>
          </div>
        </div>
      )}
    </>


  )
}