type Props = {
  phase: "card" | "cut";
};

export default function SingleGachaCard({ phase }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className={`card-cut ${phase === "cut" ? "cut" : ""}`}>
        <img className="card-top" src="/menuCardImages/startar-card.png"></img>
        <img className="card-bottom" src="/menuCardImages/startar-card.png"></img>
      </div>
    </div>
  )
}