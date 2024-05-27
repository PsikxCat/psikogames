'use client'

import { useContext, useState } from 'react'

import { useCurrentUser } from '@/hooks/use-current-user'
import { GameCard, StatsModal } from '@/components'
import { Button } from '@/components/ui/button'
import { GamesContext } from '@/context/games-context/GamesContext'

export default function GamesPage() {
  const { gamesData } = useContext(GamesContext)
  const [showModal, setShowModal] = useState<{ show: boolean, gameName: string }>({ show: false, gameName: '' })

  const user = useCurrentUser()
  const role = user?.role
  const userId = user?.id

  return (
    <div className="flex_center_column gap-10">
      <h1 className='text-2xl uppercase font-medium text-primary text-center'>
        ¿Qué quieres jugar hoy?
      </h1>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {gamesData.map((game, index) => (
          <GameCard
            key={index}
            imageSrc={game.imageUrl}
            gameName={game.name}
            playButtonHref={`/games/${game.name.toLowerCase()}?game-name=${game.name}&game-id=${game.id}`}
            setShowModal={setShowModal}
          >
            <p>{game.description}</p>
          </GameCard>
        ))}
      </section>

      {role === 'ADMIN' && (
        <Button variant="link" asChild>
          <a href="/admin/games/new">administrar esquemas</a>
        </Button>
      )
      }

      {showModal?.show && (
        <div onClick={() => { setShowModal({ show: false, gameName: '' }) }}>
          <StatsModal gameName={showModal.gameName} userId={userId!} />
        </div>
      )}
    </div>
  )
}
