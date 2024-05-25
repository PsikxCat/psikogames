export interface CardType {
  id: string
  src: string
  found: boolean
}

// tipos de constantes
export interface CardImagetype {
  src: string
}

export interface KeyPadLetterType {
  letter: string
  status: statusLetterType
}

// tipos de games

export enum statusLetterType {
  correct = 'correct',
  inWord = 'inWord',
  notInWord = 'notInWord',
  unknown = 'unknown'
}

export interface SquareType {
  isRevealed: boolean
  isFlagged: boolean
  isMine: boolean
  neighbourMines: number
}

export interface GameStatusType {
  isGameFinished: boolean
  isGameWon: boolean
}

export interface GameResponseType {
  id: string
  name: string
  description: string
}
