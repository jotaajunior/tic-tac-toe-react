import { Header } from '../Header'
import { Board } from '../Board'
import { useGame } from '../../hooks/useGame'
import { Status } from '../../utils/checkStatus'

export function Game() {
  const { status } = useGame()

  return (
    <div className="game">
      <Header />
      <Board />

      {status === Status.TIMES_WIN && <h1>X ganhou!</h1>}
      {status === Status.CIRCLE_WIN && <h1>O ganhou!</h1>}
      {status === Status.DRAW && <h1>Velha!</h1>}
    </div>
  )
}
