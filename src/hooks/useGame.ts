import { useContext } from 'react'

import { GameContext } from '../context/GameContext'

export function useGame() {
  return useContext(GameContext)
}
