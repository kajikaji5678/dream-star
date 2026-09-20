import "./BattleForm.css"

export default function BattleForm() {
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
        </div>
      </div>
    </>
  )
}