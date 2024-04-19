import type { statusLetterType } from '@/types'
import { Row } from '@/components'

interface GridProps {
  currentGuess: string
  formattedGuesses: { letter: string, status: statusLetterType }[][]
  turn: number
}

export default function Grid({ currentGuess, formattedGuesses, turn }: GridProps) {
  return (
    <section className="flex_center_column">
      {formattedGuesses.map((formattedGuess, i) => (
        i !== turn
          ? (
          <Row key={i} formattedGuess={formattedGuess} />
            )
          : (
          <Row key={i} currentGuess={currentGuess} />
            )
      ))}
    </section>
  )
}
