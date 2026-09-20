import "./BattleForm.css"
import { useEffect, useState } from "react";

export default function BattleForm() {

  const sampleCards = [
    {
      id: 1,
      image: "/menuCardImages/21-DR.png"
    },
    {
      id: 2,
      image: "/menuCardImages/Dr.srone.png"
    },
    {
      id: 3,
      image: "/menuCardImages/kano-DR.jpg"
    },
    {
      id: 4,
      image: "/menuCardImages/GXR.png"
    },
  ]

  const [hand, setHand] = useState(sampleCards);

  const selectedCard = hand[hand.length - 1];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a") {
        setHand((prev) => [
          prev[prev.length - 1],
          ...prev.slice(0, -1),
        ]);
      }
      if (event.key === "d") {
        setHand((prev) => [
          ...prev.slice(1),
          prev[0],
        ]);
      };
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return (
    <>
      <div className="battle-screen">
        <div className="battle-mat">
          <div className="battle-side opponent">
            <div className="battle-row">
              <span className="row-label">前衛</span>

              <div className="card-slots">
                {[1, 2, 3, 4].map((slot) => (
                  <div className="card-slot" key={slot} />
                ))}
              </div>
            </div>

            <div className="battle-row">
              <span className="row-label">中衛</span>

              <div className="card-slots">
                {[1, 2, 3, 4].map((slot) => (
                  <div className="card-slot" key={slot} />
                ))}
              </div>
            </div>

            <div className="battle-sub">
              <span className="row-label-back">後衛</span>
              <div className="card-slot-back" />
            </div>
          </div>
          <div className="battle-side player">
            <div className="battle-row">
              <span className="row-label">前衛</span>

              <div className="card-slots">
                {[1, 2, 3, 4].map((slot) => (
                  <div className="card-slot" key={slot} />
                ))}
              </div>
            </div>

            <div className="battle-row">
              <span className="row-label">中衛</span>

              <div className="card-slots">
                {[1, 2, 3, 4].map((slot) => (
                  <div className="card-slot" key={slot} />
                ))}
              </div>
            </div>

            <div className="battle-sub">
              <span className="row-label-back">後衛</span>
              <div className="card-slot-back" />
            </div>
          </div>
          <div className="my-hand">
            {hand.map((card, index) => (
              <img
                className="my-hand-card"
                key={card.id}
                src={card.image}
                style={{
                  zIndex: index,
                  left: `${index * 25}px`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="selected-card">
          <img
            src={selectedCard.image}
          />
        </div>
      </div>
    </>
  )
}