import type { statusLetterType } from '@/types'
import { Row } from '@/components'

interface GridProps {
  currentGuess: string
  formattedGuesses: { letter: string, status: statusLetterType }[][]
  turns: number
}

export default function WordleGrid({ currentGuess, formattedGuesses, turns }: GridProps) {
  return (
    <section className="flex_center_column">
      {formattedGuesses.map((formattedGuess, i) => (
        i !== turns
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
