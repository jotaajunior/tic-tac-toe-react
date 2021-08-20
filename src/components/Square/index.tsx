import clsx from 'clsx'
import { HTMLProps } from 'react'

import { Player } from '../../types'

import './style.css'

export interface SquareProps extends HTMLProps<HTMLSpanElement> {
  type: Player
  isBlocked?: boolean
}

export function Square({ children, type, isBlocked, ...rest }: SquareProps) {
  if (type === 'O') {
    return (
      <span
        className={clsx(['square', 'times'], { blocked: isBlocked })}
        {...rest}
      >
        O
      </span>
    )
  }

  if (type === 'X') {
    return (
      <span
        className={clsx(['square', 'circle'], { blocked: isBlocked })}
        {...rest}
      >
        X
      </span>
    )
  }

  return (
    <span className={clsx('square', { blocked: isBlocked })} {...rest}>
      &nbsp;
    </span>
  )
}
