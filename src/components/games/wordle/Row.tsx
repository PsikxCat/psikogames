import type { statusLetterType } from '@/types'

interface RowProps {
  formattedGuess: { letter: string, status: statusLetterType }[]
}

export default function Row({ formattedGuess }: RowProps) {
  return (
    <section className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </section>
  )
}
