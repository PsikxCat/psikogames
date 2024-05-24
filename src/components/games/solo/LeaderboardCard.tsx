'use client'

import { PersonIcon, GlobeIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import LeaderboardItem from './LeaderboardItem'
import { useState } from 'react'

interface LeaderboardCardProps {
  game: string
  user: string
}

export default function LeaderboardCard({ game, user }: LeaderboardCardProps) {
  // Recibir la data (puntaje global y del user) del componente padre y renderizarla
  // Crear el estado que determinara si se muestra la data global o del usuario logueado
  const [showUser, setShowUser] = useState<boolean>(false)

  return (
    <article
      className='flex_center_column gap-8 rounded-lg h-[550px] min-w-[350px] w-[400px] bg-[var(--dark-dark)] py-2 z-50'
      onClick={(e) => { e.stopPropagation() }}
    >
      <p className='text-2xl uppercase text-center text-primary font-bold'>{game}</p>

      {/* mapear la data pasandola a componente Item (x2) */}
      { showUser
        ? (
        <section className='flex_center_column gap-2 w-full'>
          {/* mapeo hardcodeado */}
          {[...Array(10)].map((_, index) => (
            <LeaderboardItem key={index} data={index} />
          ))}
        </section>
          )
        : (
        <section className='flex_center_column gap-2 w-full'>
          {/* mapeo hardcodeado */}
          {[...Array(10)].map((_, index) => (
            <LeaderboardItem key={index} data={10} />
          ))}
        </section>
          )
      }

      <div className='flex self-end px-6 gap-3'>
          <Button
            variant="dark"
            className='w-auto'
            onClick={() => { setShowUser(false) }}
          >
            <GlobeIcon className='h-5 w-5' />
          </Button>

          <Button
            variant="dark"
            className='w-auto'
            onClick={() => { setShowUser(true) }}
          >
              <PersonIcon className='h-5 w-5' />
          </Button>
      </div>
    </article>
  )
}
