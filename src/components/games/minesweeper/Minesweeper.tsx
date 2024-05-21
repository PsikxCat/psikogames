'use client'

import { type Dispatch, type SetStateAction, forwardRef, useEffect, useImperativeHandle, useState, type Ref } from 'react'

import './minesweeper.css'
import { type SquareType } from '@/types'
import { createBoard, findNeighbourMines, revealSquares } from '@/hooks/games'
import { toast } from 'sonner'

interface MinesweeperProps {
  gameConfig: {
    ROWS: number
    COLS: number
    MINES: number
    FLAGS: number
  }
  setFlags: Dispatch<SetStateAction<number>>
  setElapsedTime: Dispatch<SetStateAction<number>>
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  isGameFinished: boolean
  setIsGameFinished: Dispatch<SetStateAction<boolean>>
}
interface MinesweeperRef {
  resetGame: () => void
}

function Minesweeper(
  { gameConfig, setFlags, setElapsedTime, setIsTimerRunning, isGameFinished, setIsGameFinished }: MinesweeperProps,
  ref: Ref<MinesweeperRef>
) {
  const [board, setBoard] = useState<SquareType[][]>([])
  const [resetTrigger, setResetTrigger] = useState<boolean>(false)

  const { ROWS, COLS, MINES, FLAGS } = gameConfig

  // # Efectos /////////////////////////////////////////////
  // Inicializar el tablero
  useEffect(() => {
    const initBoard = () => {
      // Crear el tablero con las minas
      const board = createBoard(ROWS, COLS, MINES)

      // Encontrar el número de minas vecinas para cada casilla
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          board[i][j].neighbourMines = findNeighbourMines(board, i, j)
        }
      }

      return board
    }

    if (resetTrigger) {
      setIsGameFinished(false)
      setResetTrigger(false)
    }

    setBoard(initBoard())
  }, [resetTrigger])

  // Actualizar el estado del juego
  useEffect(() => {
    if (!board.length) return

    const flags = board.flat().filter((square) => square.isFlagged).length
    setFlags(FLAGS - flags)

    const isGameWon =
      board.flat().every((square) => square.isRevealed || square.isMine) ||
      board
        .flat()
        .filter((square) => square.isMine)
        .every((square) => square.isFlagged)

    if (isGameWon) {
      toast.success('¡Has ganado!')
    }
  }, [board])

  // # Funciones ///////////////////////////////////////////
  const resetGame = (): void => {
    setResetTrigger(true)
    setIsTimerRunning(false)
    setElapsedTime(0)
  }

  useImperativeHandle(ref, () => ({
    resetGame
  }))

  const handleClick = (row: number, col: number): void => {
    if (isGameFinished) return

    setIsTimerRunning(true)

    const { updatedBoard, gameOver } = revealSquares(board, row, col)

    if (updatedBoard) setBoard(updatedBoard)

    if (gameOver) {
      // Revelar todas las minas
      const newBoard = board.map((row) => row.slice())
      newBoard.forEach((row) => {
        row.forEach((square) => {
          if (square.isMine && !square.isFlagged) square.isRevealed = true
        })
      })
      setBoard(newBoard)

      setIsTimerRunning(false)
      setIsGameFinished(true)
      toast.error('¡Has perdido!')
    }
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number): void => {
    e.preventDefault()

    if (isGameFinished) return

    if (!board[row][col].isRevealed) {
      const newBoard = board.map((row) => row.slice())
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
      setBoard(newBoard)
    }
  }

  return (
    <div className="grid grid-cols-12 font-extrabold text-stone-800">
      {board.map((row, i) =>
        row.map((square, j) => (
          <div
            key={`${i}-${j}`}
            className={`flex_center square h-10 w-10
              ${square.isRevealed ? 'square--revealed' : ''} ${square.isMine || square.isFlagged ? 'text-xl' : 'text-3xl'}`}
            data-value={square.neighbourMines}
            onClick={() => { handleClick(i, j) }}
            onContextMenu={(e) => { handleRightClick(e, i, j) }}
          >
            {square.isRevealed
              ? !square.isMine
                  ? square.neighbourMines === 0
                    ? ''
                    : square.neighbourMines
                  : '💣'
              : square.isFlagged
                ? '🚩'
                : ''}
          </div>
        ))
      )}
    </div>
  )
}

export default forwardRef(Minesweeper)
