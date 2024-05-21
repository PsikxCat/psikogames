import { type SquareType } from '@/types'

interface RevealReturn {
  updatedBoard: SquareType[][]
  gameOver: boolean
}
export default function revealSquares(board: SquareType[][], row: number, col: number): RevealReturn {
  // Crear una copia del estado actual de las casillas
  const updatedSquares = board.map((row) => row.slice())
  // | Se debe crear la copia de esta manera y no con el spread operator porque se está trabajando con un array de arrays con lo cual el spread operator solo copiaría las referencias de los arrays internos y no los valores de estos arrays.

  let gameOver = false

  // Función recursiva para revelar las casillas vecinas (Se encapsula la lógica de revelar las casillas vecinas)
  function reveal(row: number, col: number) {
    // Si la casilla está fuera de los límites del tablero, no hacer nada
    if (row < 0 || row >= 12 || col < 0 || col >= 12) return

    // Obtener la casilla actual de la copia
    const square = updatedSquares[row][col]

    if (square.isRevealed || square.isFlagged) return
    if (square.isMine) gameOver = true

    // Crear una nueva copia de square y actualizarla. (Buenas prácticas. No mutar el estado directamente)
    const newSquare = { ...square, isRevealed: true }
    updatedSquares[row][col] = newSquare

    // Si la casilla tiene cero minas vecinas, revelar recursivamente todas las casillas vecinas
    if (newSquare.neighbourMines === 0) {
      reveal(row - 1, col - 1)
      reveal(row - 1, col)
      reveal(row - 1, col + 1)
      reveal(row, col - 1)
      reveal(row, col + 1)
      reveal(row + 1, col - 1)
      reveal(row + 1, col)
      reveal(row + 1, col + 1)
    }
  }

  reveal(row, col)

  return { updatedBoard: updatedSquares, gameOver }
}
