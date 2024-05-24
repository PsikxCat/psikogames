'use client'

import { type Ref, type Dispatch, type SetStateAction, useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { toast } from 'sonner'

import { type KeyPadLetterType, statusLetterType, type GameStatusType } from '@/types'
import { formatGuessObject } from '@/hooks/games'
import { WordleGrid, WordleKeypad } from '@/components'

interface WordleBoardProps {
  correctWord: string
  turns: number
  setTurns: Dispatch<SetStateAction<number>>
  setElapsedTime: Dispatch<SetStateAction<number>>
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  gameStatus: { isGameFinished: boolean, isGameWon: boolean }
  setGameStatus: Dispatch<SetStateAction<GameStatusType>>
}

interface WordleRef {
  resetGame: () => void
}

function initializeFormattedGuesses(): { letter: string, status: statusLetterType }[][] {
  // el valor inicial es un array de 6 arrays de 5 objetos con letra y status
  return Array(6).fill(null).map(() =>
    Array(5).fill({ letter: '', status: statusLetterType.unknown })
  )
}

function WordleBoard(
  { correctWord, turns, setTurns, setElapsedTime, setIsTimerRunning, gameStatus, setGameStatus }: WordleBoardProps, ref: Ref<WordleRef>
) {
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guessesHistory, setGuessesHistory] = useState<string[]>([])
  const [formattedGuesses, setFormattedGuesses] = useState<{ letter: string, status: statusLetterType }[][]>(initializeFormattedGuesses)
  const [usedKeys, setUsedKeys] = useState<KeyPadLetterType[]>([])

  // | Funciones | ///////////////////////////////////////////
  const handleKeyPress = (key: KeyboardEvent | string): void => {
    if (gameStatus.isGameFinished || turns > 5) return

    let inputKey: string

    if (key instanceof KeyboardEvent) inputKey = key.key
    else inputKey = key

    const regex = /^[a-zA-ZñÑ]$/

    if (regex.test(inputKey) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + inputKey.toUpperCase())
      setIsTimerRunning(true)
    }

    if (inputKey === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1))
    if (inputKey === 'Enter') handleEnterPress()
  }

  const handleEnterPress = (): void => {
    if (turns > 5) return

    let isGuessValid = true

    if (currentGuess.length < 5) {
      toast.error('La palabra debe tener 5 letras')
      isGuessValid = false
    } else if (guessesHistory.includes(currentGuess)) {
      toast.warning('Ya has usado esa palabra')
      isGuessValid = false
    }

    if (isGuessValid) {
      const formattedGuess = formatGuessObject(correctWord, currentGuess)
      addNewGuess(formattedGuess)
    }
  }

  const addNewGuess = (formattedGuess: { letter: string, status: statusLetterType }[]) => {
    if (correctWord === currentGuess) {
      setGameStatus({ isGameFinished: true, isGameWon: true })
      setIsTimerRunning(false)
    } else if (turns === 5 && !gameStatus.isGameWon) {
      setGameStatus({ isGameFinished: true, isGameWon: false })
      setIsTimerRunning(false)
    }

    setTurns((prev) => prev + 1)
    setGuessesHistory((prev) => [...prev, currentGuess])
    setCurrentGuess('')

    setFormattedGuesses((prev) => {
      const newFormattedGuesses = [...prev]

      newFormattedGuesses[turns] = formattedGuess

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

  const resetGame = () => {
    setCurrentGuess('')
    setTurns(0)
    setGuessesHistory([])
    setGameStatus({ isGameFinished: false, isGameWon: false })
    setElapsedTime(0)
    setFormattedGuesses([
      ...Array(6).fill([...Array(5).fill({ letter: '', status: statusLetterType.unknown })])
    ])

    window.location.reload()
  }

  useImperativeHandle(ref, () => ({
    resetGame
  }))

  // | Efectos | /////////////////////////////////////////////
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    if (turns > 5 && !gameStatus.isGameWon) {
      window.removeEventListener('keydown', handleKeyPress)
    }

    if (gameStatus.isGameWon) {
      window.removeEventListener('keydown', handleKeyPress)
    }

    return () => { window.removeEventListener('keydown', handleKeyPress) }
  }, [handleKeyPress, turns, !gameStatus.isGameWon])

  return (
    <div className='flex_center_column gap-2'>
      <WordleGrid
        currentGuess={currentGuess}
        formattedGuesses={formattedGuesses}
        turns={turns}
      />

      <WordleKeypad
        usedKeys={usedKeys}
        handleKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default forwardRef(WordleBoard)
