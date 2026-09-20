import "./BattleForm.css"

export default function BattleForm() {
  return (
    <>
      <div className="battle-screen">
        <div className="battle-mat">
          {/**前衛 */}
          <div className="battle-row">
            <span className="row-label">前衛</span>
            <div className="card-slots">
              {[1, 2, 3, 4].map((slot) => (
                <div className="card-slot" key={slot} />
              ))}
            </div>
          </div>
          {/**中衛 */}
          <div className="battle-row">
            <div className="card-slots">
              {[1, 2, 3, 4].map((slot) => (
                <div className="card-slot" key={slot} />
              ))}
            </div>
          </div>
          {/**後衛 + 山札 */}
          <div className="back-row">
            <div>
              <span>後衛</span>
              <div className="card-slot" />
            </div>
            <div>
              <span>山札</span>
              <div className="card-slot" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}