import { type SquareType } from '@/types'

export default function createBoard(rows: number, cols: number, mines: number): SquareType[][] {
  const board = new Array(rows).fill(null).map(() =>
    new Array(cols).fill(null).map(() => ({
      isRevealed: false,
      isFlagged: false,
      isMine: false,
      neighbourMines: 0
    }))
  )

  let minesPlaced = 0

  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)

    if (!board[row][col].isMine) {
      board[row][col].isMine = true
      minesPlaced++
    }
  }

  return board
}
