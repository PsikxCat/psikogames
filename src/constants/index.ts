import { type KeyPadLetterType, statusLetterType, type CardImagetype } from '@/types'

export const cardsImages: CardImagetype[] = [
  { src: 'https://icongr.am/devicon/git-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/javascript-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/mongodb-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/nodejs-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/react-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/sass-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/typescript-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/vuejs-original.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/npm-original-wordmark.svg?size=120&color=000000' },
  { src: 'https://icongr.am/devicon/debian-plain.svg?size=120&color=000000' }
]

export const colors = {
  correct: '#15803d',
  inWord: '#a16207',
  notInWord: '#78716E',
  unknown: '#252323'
}

export const keypadLetters: KeyPadLetterType[] = [
  { letter: 'Q', status: statusLetterType.unknown },
  { letter: 'W', status: statusLetterType.unknown },
  { letter: 'E', status: statusLetterType.unknown },
  { letter: 'R', status: statusLetterType.unknown },
  { letter: 'T', status: statusLetterType.unknown },
  { letter: 'Y', status: statusLetterType.unknown },
  { letter: 'U', status: statusLetterType.unknown },
  { letter: 'I', status: statusLetterType.unknown },
  { letter: 'O', status: statusLetterType.unknown },
  { letter: 'P', status: statusLetterType.unknown },
  { letter: 'A', status: statusLetterType.unknown },
  { letter: 'S', status: statusLetterType.unknown },
  { letter: 'D', status: statusLetterType.unknown },
  { letter: 'F', status: statusLetterType.unknown },
  { letter: 'G', status: statusLetterType.unknown },
  { letter: 'H', status: statusLetterType.unknown },
  { letter: 'J', status: statusLetterType.unknown },
  { letter: 'K', status: statusLetterType.unknown },
  { letter: 'L', status: statusLetterType.unknown },
  { letter: 'Z', status: statusLetterType.unknown },
  { letter: 'Back', status: statusLetterType.unknown },
  { letter: 'X', status: statusLetterType.unknown },
  { letter: 'C', status: statusLetterType.unknown },
  { letter: 'V', status: statusLetterType.unknown },
  { letter: 'B', status: statusLetterType.unknown },
  { letter: 'N', status: statusLetterType.unknown },
  { letter: 'M', status: statusLetterType.unknown },
  { letter: 'Enter', status: statusLetterType.unknown }
]
