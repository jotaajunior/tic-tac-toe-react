import { createContext, useState, useMemo } from 'react'
import produce from 'immer'

import { Player, Matrix } from '../types'
import { checkStatus, Status } from '../utils/checkStatus'

export type GameContextProps = {
  round: number
  matrix: Matrix
  currentPlayer: Player
  status: Status

  play(row: number, col: number): void
  reset(): void
}

export const GameContext = createContext({} as GameContextProps)

export type GameProviderProps = {
  children: React.ReactChild[] | React.ReactChild
}

const initialMatrix = () =>
  [Array(3).fill('-'), Array(3).fill('-'), Array(3).fill('-')] as Matrix

export function GameProvider({ children }: GameProviderProps) {
  // Round state
  const [round, setRound] = useState(0)

  // Game state
  const [matrix, setMatrix] = useState(initialMatrix)

  // Gets the current player based on the round
  const currentPlayer = useMemo(
    () => (round % 2 === 0 ? 'X' : 'O') as Player,
    [round],
  )

  // The current round status
  const status = useMemo(() => checkStatus(matrix), [matrix])

  // Plays
  function play(row: number, col: number) {
    if (status === Status.PLAYING) {
      if (matrix[row][col] === '-') {
        // Updates the matrix
        setMatrix(
          produce(matrix, (draft) => {
            draft[row][col] = currentPlayer
          }),
        )

        // Advances to the next round
        setRound(round + 1)
      }
    }
  }

  // Resets the game
  function reset() {
    setMatrix(initialMatrix)
    setRound(0)
  }

  const values = {
    matrix,
    round,
    play,
    currentPlayer,
    reset,
    status,
  }

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}
