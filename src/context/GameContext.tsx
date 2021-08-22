import { createContext, useState, useMemo } from 'react'
import produce from 'immer'

import { Player, Matrix } from '../types'
import { checkStatus, Status } from '../utils/checkStatus'
import { useEffect } from 'react'

export type GameContextProps = {
  round: number
  matrix: Matrix
  currentPlayer: Player
  status: Status

  play(row: number, col: number): void
  reset(): void
  goBack(): void
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

  // Game history
  const [history, setHistory] = useState(() => [initialMatrix()])

  // X vitories
  const [timesVictories, setTimesVictories] = useState(0)
  const [circleVictories, setCircleVictories] = useState(0)

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
        const newMatrix = produce(matrix, (draft) => {
          draft[row][col] = currentPlayer
        })

        setMatrix(newMatrix)

        // Advances to the next round
        setRound(round + 1)

        // Adds to the history
        setHistory((history) => [...history, newMatrix])
      }
    }
  }

  // Resets the game
  function reset() {
    setMatrix(initialMatrix)
    setHistory(() => [initialMatrix()])
    setRound(0)
  }

  // Updates victories
  useEffect(() => {
    if (status === Status.TIMES_WIN) {
      setTimesVictories(timesVictories + 1)
    }

    if (status === Status.CIRCLE_WIN) {
      setCircleVictories(circleVictories + 1)
    }
  }, [status, timesVictories, circleVictories])

  // Go back in the history
  function goBack() {
    if (round > 0) {
      setMatrix(history[round - 1])

      // Removes the last from history
      setHistory(
        produce(history, (draft) => {
          draft.pop()
        }),
      )

      setRound(round - 1)
    }
  }

  const values = {
    matrix,
    round,
    play,
    currentPlayer,
    reset,
    status,
    goBack,
  }

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}
