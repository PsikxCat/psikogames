import { statusLetterType } from '@/types'

export default function formatGuessObject(correctWord: string, currentGuess: string): { letter: string, status: statusLetterType }[] {
  const formattedCorrectWord = correctWord.split('')
    .map<{ letter: string, isEvaluated: boolean }>((letter) => ({ letter, isEvaluated: false }))

  const formattedGuess = currentGuess.split('')
    .map<{ letter: string, status: statusLetterType }>((letter) => ({ letter, status: statusLetterType.unknown }))

  // iteracion para buscar las letras en la posicion correcta
  formattedGuess.forEach((guessLetter, i) => {
    if (guessLetter.letter === formattedCorrectWord[i].letter) {
      guessLetter.status = statusLetterType.correct
      formattedCorrectWord[i].isEvaluated = true
    }
  })

  // iteracion para buscar las letras que estan en la palabra pero en la posicion incorrecta
  formattedGuess.forEach((guessLetter) => {
    if (guessLetter.status === statusLetterType.unknown) {
      const isLetterInWord = formattedCorrectWord.find((correctLetter) => correctLetter.letter === guessLetter.letter && !correctLetter.isEvaluated)

      if (isLetterInWord) {
        guessLetter.status = statusLetterType.inWord
        isLetterInWord.isEvaluated = true
      } else {
        guessLetter.status = statusLetterType.notInWord
      }
    }
  })

  return formattedGuess
}
