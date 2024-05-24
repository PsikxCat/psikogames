'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { type statusLetterType, type KeyPadLetterType } from '@/types'
import { colors, keypadLetters } from '@/constants'

interface KeypadProps {
  usedKeys: KeyPadLetterType[]
  handleKeyPress: (key: KeyboardEvent | string) => void
}

const bounceAnimation = (status?: statusLetterType) => {
  if (!status || status === 'unknown') return

  const bgColor = status === 'correct' ? colors.correct : status === 'inWord' ? colors.inWord : status === 'notInWord' ? colors.notInWord : colors.unknown

  return {
    initial: { scale: 1, borderColor: '#bbb' },
    animate: {
      scale: [1, 1.2, 1],
      borderColor: ['#bbb', '#bbb', '#333'],
      backgroundColor: [colors.unknown, colors.unknown, bgColor, bgColor],
      // borderColor: [COLORS.unknown, COLORS.unknown, borderColor, borderColor],

      transition: { duration: 0.5 }
    }
  }
}

export default function WordleKeypad({ usedKeys, handleKeyPress }: KeypadProps) {
  const [letters, setLetters] = useState<KeyPadLetterType[]>([])
  useEffect(() => { setLetters(keypadLetters) }, [])

  return (
    <div className="wordle_keypad">
      {letters?.map((letter) => {
        const usedKey = usedKeys.find((key) => key.letter === letter.letter)

        return (
          letter.letter === 'Back'
            ? (
            <motion.div
              key={letter.letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ width: '68px', background: '#FFBB5C', color: '#333', fontWeight: 'bold' }}
              {...bounceAnimation(usedKey?.status)}
              onClick={() => { handleKeyPress('Backspace') }}
            >
              {letter.letter}
            </motion.div>
              )
            : letter.letter === 'Enter'
              ? (
            <motion.div
              key={letter.letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ width: '68px', background: '#FFBB5C', color: '#333', fontWeight: 'bold' }}
              {...bounceAnimation(usedKey?.status)}
              onClick={() => { handleKeyPress('Enter') }}
            >
              {letter.letter}
            </motion.div>
                )
              : (
            <motion.div
              key={letter.letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              {...bounceAnimation(usedKey?.status)}
              onClick={() => { handleKeyPress(letter.letter) }}
            >
              {letter.letter}
            </motion.div>
                )
        )
      })}
    </div>
  )
}
