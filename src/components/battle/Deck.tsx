import "./Deck.css"

export default function Deck() {
  return (
    <>
      <div className="deck">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="deck-card"
            key={index}
            style={{transform: `translate(${index + 2}px, ${index + 2}px)`, zIndex: index}}
          >
            default
          </div>
        ))}
      </div>
    </>
  )
}