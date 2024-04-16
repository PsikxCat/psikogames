import type { statusLetterType } from '@/types'
import { Row } from '@/components'

interface GridProps {
  currentGuess: string
  turn: number
  formattedGuesses: { letter: string, status: statusLetterType }[][]
}

export default function Grid({ currentGuess, turn, formattedGuesses }: GridProps) {
  return (
    <div className="flex_center_column">
      <p>{currentGuess}</p>
      <p>{turn}</p>

      {formattedGuesses.map((formattedGuess, i) => (
        <Row key={i} formattedGuess={formattedGuess} />
      ))}
    </div>
  )
}
