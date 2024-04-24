'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { type KeyPadLetterType, statusLetterType } from '@/types'

export function useWordle(correctWord: string) {
  const [turn, setTurn] = useState<number>(0)
  const [formattedGuesses, setFormattedGuesses] = useState<{ letter: string, status: statusLetterType }[][]>([
    ...Array(6).fill([...Array(5).fill({ letter: '', status: statusLetterType.unknown })])
  ]) // el valor inicial es un array de 6 arrays de 5 objetos con letra y status
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guessesHistory, setGuessesHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  const [usedKeys, setUsedKeys] = useState<KeyPadLetterType[]>([])

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime: number) => prevTime + 1)
      }, 1000)

      return () => { clearInterval(timer) }
    }
  }, [timerRunning])

  const resetGame = () => {
    setCurrentGuess('')
    setTurn(0)
    setGuessesHistory([])
    setIsCorrect(false)
    setFormattedGuesses([
      ...Array(6).fill([...Array(5).fill({ letter: '', status: statusLetterType.unknown })])
    ])

    // setUsedKeys({})
    window.location.reload()
  }

  const handleKeyPress = (key: KeyboardEvent | string): void => {
    if (isCorrect || turn > 5) return

    let inputKey: string

    if (key instanceof KeyboardEvent) inputKey = key.key
    else inputKey = key

    const regex = /^[a-zA-ZñÑ]$/

    if (regex.test(inputKey) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + inputKey.toUpperCase())
      setTimerRunning(true)
    }

    if (inputKey === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1))
    if (inputKey === 'Enter') handleEnterPress()
  }

  const handleEnterPress = (): void => {
    if (turn > 5) return

    let isGuessValid = true

    if (currentGuess.length < 5) {
      toast.error('La palabra debe tener 5 letras')
      isGuessValid = false
    } else if (guessesHistory.includes(currentGuess)) {
      toast.warning('Ya has usado esa palabra')
      isGuessValid = false
    }

    if (isGuessValid) {
      const formattedGuess = formatGuessObject()
      addNewGuess(formattedGuess)
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

  // # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const addNewGuess = (formattedGuess: { letter: string, status: statusLetterType }[]) => {
    if (correctWord === currentGuess) {
      setIsCorrect(true)
      setTimerRunning(false)
    } else if (turn === 5 && !isCorrect) {
      setTimerRunning(false)
    }

    setTurn((prev) => prev + 1)
    setGuessesHistory((prev) => [...prev, currentGuess])
    setCurrentGuess('')

    setFormattedGuesses((prev) => {
      const newFormattedGuesses = [...prev]

      newFormattedGuesses[turn] = formattedGuess

      return newFormattedGuesses
    })

    setUsedKeys((prev) => {
      const newKeys = [...prev]

      formattedGuess.forEach((guess) => {
        const existingKey = newKeys.find((key) => key.letter === guess.letter)

        if (!existingKey) {
          newKeys.push({ letter: guess.letter, status: guess.status })
        } else {
          if (guess.status === statusLetterType.correct) {
            existingKey.status = statusLetterType.correct
          } else if (guess.status === statusLetterType.inWord && existingKey.status !== statusLetterType.correct) {
            existingKey.status = statusLetterType.inWord
          }
        }
      })

      return newKeys
    })
  }

  return {
    turn,
    formattedGuesses,
    currentGuess,
    guessesHistory,
    isCorrect,
    handleKeyPress,
    elapsedTime,
    resetGame,
    usedKeys
  }
}
