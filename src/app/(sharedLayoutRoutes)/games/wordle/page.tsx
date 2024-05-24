'use client'

import { useEffect, useRef, useState } from 'react'

import { type GameStatusType } from '@/types'
import getRandomWord from '@/utils/get-random-word'
import formatTime from '@/utils/format-time'
import { Button } from '@/components/ui/button'
import { FinishGameModal, Timer, WordleBoard } from '@/components'

interface WordleRef {
  resetGame: () => void
}

export default function WordleGamePage() {
  const [correctWord, setCorrectWord] = useState<string>('')
  const [turns, setTurns] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [gameStatus, setGameStatus] = useState<GameStatusType>({ isGameFinished: false, isGameWon: false })

  const wordleRef = useRef<WordleRef | null>(null)

  const resetGame = (): void => {
    wordleRef.current!.resetGame()
  }

  useEffect(() => {
    setCorrectWord(getRandomWord())
  }, [])

  return (
    <main className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Wordle
      </h1>

      <Button
        variant="main"
        className='w-auto mb-4'
        onClick={resetGame}
      >
        Nuevo juego
      </Button>

      <section className='flex_center_column gap-2 max-w-[700px]'>
        <div className='w-full flex justify-between mt-4 px-3'>
          <span>Turno: {turns}</span>

          <Timer
            isGameFinished={gameStatus.isGameFinished}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
          />
        </div>

        <WordleBoard
          correctWord={correctWord}
          turns={turns}
          ref={wordleRef}
          setTurns={setTurns}
          setElapsedTime={setElapsedTime}
          setIsTimerRunning={setIsTimerRunning}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      </section>

      {gameStatus.isGameFinished && (
        <FinishGameModal
          setGameStatus={setGameStatus}
          isGameWon={gameStatus.isGameWon}
          resetGame={resetGame}
          mainLabel={formatTime(elapsedTime)}
          secondaryLabel={`Palabra correcta: ${correctWord}`}
        />
      )}
    </main>
  )
}
