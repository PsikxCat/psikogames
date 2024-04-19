'use client'

import { motion } from 'framer-motion'

import type { statusLetterType } from '@/types'

interface RowProps {
  formattedGuess?: { letter: string, status: statusLetterType }[]
  currentGuess?: string
}

const COLORS = {
  correct: '#15803d',
  inWord: '#a16207',
  notInWord: '#78716E',
  unknown: '#252323'
}

// Animaciones
const flipAnimation = (i: number, status: statusLetterType) => {
  const bgColor = status === 'correct' ? COLORS.correct : status === 'inWord' ? COLORS.inWord : status === 'notInWord' ? COLORS.notInWord : COLORS.unknown
  const borderColor = status === 'correct' ? COLORS.correct : status === 'inWord' ? COLORS.inWord : status === 'notInWord' ? COLORS.notInWord : COLORS.unknown

  return {
    initial: { rotateX: 0, backgroundColor: COLORS.unknown },
    animate: {
      rotateX: [0, 90, 90, 0],
      backgroundColor: [COLORS.unknown, COLORS.unknown, bgColor, bgColor],
      borderColor: [COLORS.unknown, COLORS.unknown, borderColor, borderColor],
      transition: { duration: 0.5, times: [0, 0.45, 0.55, 1], delay: i * 0.2 }
    }
  }
}

const bounceAnimation = {
  initial: { scale: 1, borderColor: '#bbb' },
  animate: { scale: [1, 1.2, 1], borderColor: ['#bbb', '#bbb', '#333'], transition: { duration: 0.5 } }
}

// COMPONENTE ROW
export default function Row({ formattedGuess, currentGuess }: RowProps) {
  // Si el turno es diferente a la iteracion
  if (formattedGuess) {
    // Se renderizan los valores de las letras en el row (sean estos '' o valores de las letras)
    return (
      <section className="wordle_row">
        {formattedGuess.map((letter, i) => (
          <motion.div key={i} id={letter.status} {...flipAnimation(i, letter.status)}>
            {letter.letter}
          </motion.div>
        ))}
      </section>
    )
  }

  // Si el turno es igual a la iteracion
  if (currentGuess) {
    const letters = currentGuess.split('')
    // Se renderizan los valores en letters (cambia con tipeado de usuario), las casillas restantes se renderizan con un div vacio
    return (
      <section className='wordle_row'>
        {/* Letras del currentsGuess/letters */}
        {letters.map((letter, i) => (
            <motion.div key={i} {...bounceAnimation}>
              {letter}
            </motion.div>
        ))}
        {/* Casillas vacias restantes */}
        {[...Array(5 - letters.length)].map((_, i) => (
            <div key={i} />
        ))}
      </section>
    )
  } else {
    // Se renderizan 5 casillas vacias que se muestran antes de que el usuario comience a tipear (currentGuess en undefined/'')
    return (
      <section className='wordle_row'>
        {[...Array(5)].map((_, i) => (
            <div key={i} />
        ))}
      </section>
    )
  }
}
