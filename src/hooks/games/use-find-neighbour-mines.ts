import { type SquareType } from '@/types'

export default function findNeighbourMines(board: SquareType[][], row: number, col: number): number {
  const directions = [
    { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 },
    { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, // Se omite la casilla actual (dx: 0, dy: 0)
    { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 }
  ]

  let neighbourMines = 0

  for (const direction of directions) {
    const newRow = row + direction.dx
    const newCol = col + direction.dy

    if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
      if (board[newRow][newCol].isMine) {
        neighbourMines++
      }
    }
  }

  return neighbourMines
}
