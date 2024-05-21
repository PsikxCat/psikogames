'use client'

import { useEffect, type Dispatch, type SetStateAction } from 'react'

import formatTime from '@/utils/format-time'

interface TimerProps {
  isGameFinished: boolean
  isTimerRunning: boolean
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  elapsedTime: number
  setElapsedTime: Dispatch<SetStateAction<number>>
}

export default function Timer({ isGameFinished, isTimerRunning, setIsTimerRunning, elapsedTime, setElapsedTime }: TimerProps) {
  useEffect(() => {
    if (isGameFinished) setIsTimerRunning(false)

    if (isTimerRunning) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime: number) => prevTime + 1)
      }, 1000)

      return () => { clearInterval(timer) }
    }
  }, [isTimerRunning])
  return (
    <span>{formatTime(elapsedTime)} ⏱</span>
  )
}
