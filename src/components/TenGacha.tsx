type Props = {
  phase?: "card" | "cut" | "gather";
};

const CARDS = Array.from({ length: 12 });

export default function TenGachaCard({ phase }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* {phase === "gather" && ( */}
        <div className="gacha-gether">
          {CARDS.map((_, index) => {
            return (
              <img
                key={index}
                className="gether-card"
                src="/menuCardImages/startar-card.png"
                style={
                  {
                    "--angle": `${index * 30}deg`
                  } as React.CSSProperties
                }
              />
            )
          })}
        </div>
      {/* )} */}

      {phase === "cut" && (
        <div className="card-cut cut">
          <img
            className="card-top"
            src="/menuCardImages/startar-card.png"
          />
          <img
            className="card-bottom"
            src="/menuCardImages/startar-card.png"
          />
        </div>
      )}
    </div>
  )
}