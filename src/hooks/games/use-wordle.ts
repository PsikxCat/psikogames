'use client'

import { useState } from 'react'

import { statusLetterType } from '@/types'

export function useWordle(correctWord: string) {
  const [turn, setTurn] = useState<number>(0)
  const [guesses, setGuesses] = useState<{ letter: string, status: statusLetterType }[][]>([])
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  // handle keys
  const handleKeyPress = (e: KeyboardEvent): void => {
    const key = e?.key
    const regex = /^[a-zA-ZñÑ]$/

    if (key === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1))
    if (key === 'Enter') handleEnter()

    if (regex.test(key)) {
      if (currentGuess.length < 5) setCurrentGuess((prev) => prev + key.toUpperCase())
      else if (currentGuess.length === 5) setCurrentGuess((prev) => prev.slice(0, -1) + key.toUpperCase())
    }
  }

  const handleEnter = (): void => {
    let isGuessValid = true

    if (turn > 5) {
      isGuessValid = false
      console.log('Has usado todos tus intentos, perdiste')
    } else if (currentGuess.length !== 5) {
      isGuessValid = false
      console.log('La palabra debe tener 5 letras')
    } else if (history.includes(currentGuess)) {
      isGuessValid = false
      console.log('Ya has usado esta palabra')
    }

    if (isGuessValid) {
      const formattedGuess = formatGuess()
      console.log(formattedGuess)
    }
  }

  const formatGuess = (): { letter: string, status: statusLetterType }[] => {
    const correctWordToArray = correctWord.toUpperCase().split('')
    const formattedGuess = currentGuess.split('')
      .map<{ letter: string, status: statusLetterType }>((letter) => ({ letter, status: statusLetterType.unknown }))

    formattedGuess.forEach((item, i) => {
      if (item.letter === correctWordToArray[i]) {
        item.status = statusLetterType.correct
        correctWordToArray[i] = '' // letra encontrada, se elimina del array para evitar errores
        console.log('letra correcta', item.letter)
      } else {
        const index = correctWordToArray.indexOf(item.letter)
        if (index !== -1) {
          item.status = statusLetterType.inWord
          correctWordToArray[index] = ''
          console.log('letra en palabra', item.letter)
        }
      }
    })

    return formattedGuess
  }

  return {
    turn,
    guesses,
    currentGuess,
    history,
    isCorrect,
    handleKeyPress // importar desde wordsTable?
  }
}
