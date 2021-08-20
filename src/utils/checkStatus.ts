import { Matrix } from '../types'

export enum Status {
  DRAW = 'draw',
  TIMES_WIN = 'times_win',
  CIRCLE_WIN = 'circle_win',
  PLAYING = 'playing',
}

function getRound(matrix: Matrix) {
  return matrix.flat().filter((square) => ['O', 'X'].includes(square)).length
}

function checkHorizontal(matrix: Matrix) {
  for (const row of matrix) {
    if (!row.includes('-')) {
      const isSamePlayer = row[0] === row[1] && row[1] === row[2]

      if (isSamePlayer) {
        if (row[0] === 'X') {
          return Status.TIMES_WIN
        }

        if (row[0] === 'O') {
          return Status.CIRCLE_WIN
        }
      }
    }
  }

  if (getRound(matrix) === 9) {
    return Status.DRAW
  }

  return Status.PLAYING
}

function checkVertical(matrix: Matrix) {
  for (let i = 0; i < 3; ++i) {
    const selected = [matrix[0][i], matrix[1][i], matrix[2][i]]

    if (!selected.includes('-')) {
      const isSamePlayer =
        selected[0] === selected[1] && selected[1] === selected[2]

      if (isSamePlayer) {
        if (selected[1] === 'X') {
          return Status.TIMES_WIN
        }

        if (selected[0] === 'O') {
          return Status.CIRCLE_WIN
        }
      }
    }
  }

  if (getRound(matrix) === 9) {
    return Status.DRAW
  }

  return Status.PLAYING
}

function checkDiagonal(matrix: Matrix) {
  const diagonals = [
    [matrix[0][0], matrix[1][1], matrix[2][2]],
    [matrix[0][2], matrix[1][1], matrix[2][0]],
  ]

  for (const diagonal of diagonals) {
    if (!diagonal.includes('-')) {
      const isSamePlayer =
        diagonal[0] === diagonal[1] && diagonal[1] === diagonal[2]

      if (isSamePlayer) {
        if (diagonal[0] === 'X') {
          return Status.TIMES_WIN
        }

        if (diagonal[0] === 'O') {
          return Status.CIRCLE_WIN
        }
      }
    }
  }

  if (getRound(matrix) === 9) {
    return Status.DRAW
  }

  return Status.PLAYING
}

export function checkStatus(matrix: Matrix) {
  const horizontalResult = checkHorizontal(matrix)

  if (horizontalResult !== Status.PLAYING) {
    return horizontalResult
  }

  const verticalResult = checkVertical(matrix)

  if (verticalResult !== Status.PLAYING) {
    return verticalResult
  }

  const diagonalResult = checkDiagonal(matrix)

  if (diagonalResult !== Status.PLAYING) {
    return diagonalResult
  }

  return Status.PLAYING
}
