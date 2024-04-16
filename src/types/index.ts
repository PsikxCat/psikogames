export interface CardType {
  id: string
  src: string
  found: boolean
}

// tipos de games

export enum statusLetterType {
  correct = 'correct',
  inWord = 'inWord',
  notInWord = 'notInWord',
}
