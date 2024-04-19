'use client'

import { useState } from 'react'

import { statusLetterType } from '@/types'

export function useWordle(correctWord: string) {
  const [turn, setTurn] = useState<number>(0)
  const [formattedGuesses, setFormattedGuesses] = useState<{ letter: string, status: statusLetterType }[][]>([
    ...Array(6).fill([...Array(5).fill({ letter: '', status: statusLetterType.unknown })])
  ]) // el valor inicial es un array de 6 arrays de 5 objetos con letra y status
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guessesHistory, setGuessesHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  const handleKeyPress = (e: KeyboardEvent): void => {
    const key = e?.key
    const regex = /^[a-zA-ZñÑ]$/

    if (regex.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key.toUpperCase())
    }

    if (key === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1))
    if (key === 'Enter') handleEnterPress()
  }

  const handleEnterPress = (): void => { // pendiente notificaciones con sonner
    let isGuessValid = true

    if (turn > 5) {
      isGuessValid = false
      console.log('Has usado todos tus intentos, perdiste') // Mostrar modal con la palabra correcta y un boton para reiniciar el juego
    } else if (currentGuess.length !== 5) {
      isGuessValid = false
      console.log('La palabra debe tener 5 letras') // instalar sonner para las notificaciones
    } else if (guessesHistory.includes(currentGuess)) {
      isGuessValid = false
      console.log('Ya has usado esta palabra') // instalar sonner para las notificaciones
    }

    if (isGuessValid) {
      const formattedGuess = formatGuessObject()
      addNewGuess(formattedGuess)
      // Mostrar modal con la palabra correcta y un boton para reiniciar el juego
      // Resetear el juego
    }
  }

  const formatGuessObject = (): { letter: string, status: statusLetterType }[] => {
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

  const addNewGuess = (formattedGuess: { letter: string, status: statusLetterType }[]) => {
    setTurn((prev) => prev + 1)
    setCurrentGuess('')
    setGuessesHistory((prev) => [...prev, currentGuess])
    setFormattedGuesses((prev) => {
      const newFormattedGuesses = [...prev]
      newFormattedGuesses[turn] = formattedGuess
      return newFormattedGuesses
    })

    if (correctWord === currentGuess) {
      setIsCorrect(true)
      console.log('Has ganado!')
    }
  }

  return {
    turn,
    formattedGuesses,
    currentGuess,
    guessesHistory,
    isCorrect,
    handleKeyPress
  }
}
