'use client'

import { useState } from 'react'

import { statusLetterType } from '@/types'

export function useWordle(correctWord: string) {
  const [turn, setTurn] = useState<number>(0)
  const [formattedGuesses, setFormattedGuesses] = useState<{ letter: string, status: statusLetterType }[][]>([
    ...Array(6).fill([...Array(5).fill({ letter: '', status: statusLetterType.notInWord })])
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
      console.log('Has usado todos tus intentos, perdiste') // instalar sonner para las notificaciones
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
    }
  }

  const formatGuessObject = (): { letter: string, status: statusLetterType }[] => {
    const correctWordToArray = correctWord.split('')
    const formattedGuess = currentGuess.split('')
      .map<{ letter: string, status: statusLetterType }>((letter) => ({ letter, status: statusLetterType.notInWord }))

    // iteracion para buscar coincidencias (correct & inWord) y setear el status de cada letra
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
      console.log('Has ganado!') // instalar sonner para las notificaciones
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
