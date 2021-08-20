import { Square } from '../../components/Square'
import { useGame } from '../../hooks/useGame'
import { Status } from '../../utils/checkStatus'

export function Board() {
  const { matrix, play, status } = useGame()

  return (
    <>
      {matrix.map((row, rowIndex) => (
        <div>
          {row.map((player, columnIndex) => (
            <Square
              isBlocked={status !== Status.PLAYING}
              type={player}
              onClick={() => play(rowIndex, columnIndex)}
            />
          ))}
        </div>
      ))}
    </>
  )
}
