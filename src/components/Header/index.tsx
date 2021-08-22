import { RiArrowGoBackLine } from 'react-icons/ri'
import { FiRefreshCcw } from 'react-icons/fi'

import { useGame } from '../../hooks/useGame'

import './style.css'

export function Header() {
  const { round, reset, goBack, currentPlayer } = useGame()

  return (
    <div className="header">
      Turno: {round} ({currentPlayer})
      <div className="buttons">
        <button onClick={goBack}>
          <RiArrowGoBackLine />
        </button>

        <button onClick={reset}>
          <FiRefreshCcw />
        </button>
      </div>
    </div>
  )
}
