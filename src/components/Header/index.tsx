import { useGame } from '../../hooks/useGame'

import './style.css'

export function Header() {
  const { round, reset, currentPlayer } = useGame()

  return (
    <div className="header">
      Turno: {round} ({currentPlayer})
      <button className="reset-button" onClick={reset}>
        Resetar
      </button>
    </div>
  )
}
