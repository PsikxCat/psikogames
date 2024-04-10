import { GameCard } from '@/components'

export default function GamesPage() {
  return (
    <div className="flex_center_column gap-10">
      {/* <h1 className='text-3xl uppercase font-medium text-primary' >
        Juegos
      </h1> */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <GameCard
          imageSrc='/images/memory-cards.webp'
          gameName='Memory'
          playButtonHref='/games/memory'
          statsButtonHref='/games/stats/#memory'
        >
          <p>Recuerda la posición de las cartas para hacer parejas.</p>
        </GameCard>

        <GameCard
          imageSrc='/psikogames.webp'
          gameName='Scrabble'
          playButtonHref='/games/#'
          statsButtonHref='/games/stats/#'
        >
          <p>Forma palabras con las letras que te toquen.</p>
        </GameCard>

        <GameCard
          imageSrc='/psikogames.webp'
          gameName='Buscaminas'
          playButtonHref='/games/#'
          statsButtonHref='/games/stats/#'
        >
          <p>Encuentra todas las minas sin explotar.</p>
        </GameCard>
      </div>
    </div>
  )
}
