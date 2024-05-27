'use client'

import { useContext } from 'react'

import { GamesContext } from '@/context/games-context/GamesContext'
import { LeaderboardCard } from '@/components'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function LeaderboardPage() {
  const { gamesData } = useContext(GamesContext)

  const user = useCurrentUser()
  const userId = user?.id

  return (
    <section className="h-full flex_center flex-wrap gap-5 ">
      {gamesData.map((game, index) => (
        <LeaderboardCard key={index} gameName={game.name} userId={userId!} />
      ))}
    </section>
  )
}
