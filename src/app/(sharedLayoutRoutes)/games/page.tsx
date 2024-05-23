'use client'
// import { auth } from '@/auth'
import { useCurrentUser } from '@/hooks/use-current-user'
import { GameCard, StatsModal } from '@/components'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function GamesPage() {
  const user = useCurrentUser()
  const role = user?.role
  const name = user?.name

  const [showModal, setShowModal] = useState<{ show: boolean, game: string }>({ show: false, game: '' })

  return (
    <div className="flex_center_column gap-10">
      <h1 className='text-2xl uppercase font-medium text-primary'>
        ¿Qué quieres jugar hoy?
      </h1>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <GameCard
          imageSrc='/images/memory-game.webp'
          gameName='Memory'
          playButtonHref='/games/memory'
          setShowModal={setShowModal}
        >
          <p>Recuerda la posición de las cartas para hacer parejas.</p>
        </GameCard>

        <GameCard
          imageSrc='/images/wordle-game.webp'
          gameName='Wordle'
          playButtonHref='/games/wordle'
          setShowModal={setShowModal}
        >
          <p>Adivina la palabra secreta en 6 intentos o menos.</p>
        </GameCard>

        <GameCard
          imageSrc='/images/minesweeper-game.webp'
          gameName='Minesweeper'
          playButtonHref='/games/minesweeper'
          setShowModal={setShowModal}
        >
          <p>Encuentra todas las minas sin explotar.</p>
        </GameCard>
      </section>

      {role === 'ADMIN' && (
        <Button variant="link" asChild>
          <a href="/admin/games/new">administrar modelos</a>
        </Button>
      )
      }

      {showModal?.show && (
        <div onClick={() => { setShowModal({ show: false, game: '' }) }}>
          <StatsModal gameName={showModal.game} user={name!} />
        </div>
      )}
    </div>
  )
}
