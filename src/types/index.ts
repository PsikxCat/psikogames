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
