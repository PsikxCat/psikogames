import { GameCard } from '@/components'

export default function GamesPage() {
  return (
    <div className="flex_center_column gap-10">
      <h1 className='text-2xl uppercase font-medium text-primary' >
        ¿Qué quieres jugar hoy?
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <GameCard
          imageSrc='/images/memory-game.webp'
          gameName='Memory'
          playButtonHref='/games/memory'
          statsButtonHref='/games/stats/#memory'
        >
          <p>Recuerda la posición de las cartas para hacer parejas.</p>
        </GameCard>

        <GameCard
          imageSrc='/images/wordle-game.webp'
          gameName='Wordle'
          playButtonHref='/games/wordle'
          statsButtonHref='/games/stats/#wordle'
        >
          <p>Adivina la palabra secreta en 6 intentos o menos.</p>
        </GameCard>

        <GameCard
          imageSrc='/images/minesweeper-game.webp'
          gameName='Buscaminas'
          playButtonHref='/games/minesweeper'
          statsButtonHref='/games/stats/#'
        >
          <p>Encuentra todas las minas sin explotar.</p>
        </GameCard>
      </div>
    </div>
  )
}
