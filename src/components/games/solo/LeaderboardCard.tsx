'use client'

import { useContext, useState } from 'react'
import { PersonIcon, GlobeIcon } from '@radix-ui/react-icons'

import { GamesContext } from '@/context/games-context/GamesContext'
import { Button } from '@/components/ui/button'
import { LeaderboardItem } from '@/components'

interface LeaderboardCardProps {
  gameName: string
  userId: string
}

export default function LeaderboardCard({ gameName, userId }: LeaderboardCardProps) {
  const [showUserStats, setShowUserStats] = useState<boolean>(false)
  const { scoresData } = useContext(GamesContext)

  const gameScores = scoresData.filter((score) => score.gameName === gameName).sort((a, b) => a.value - b.value).slice(0, 10)
  const userScores = scoresData.filter((score) => score.userId === userId && score.gameName === gameName).sort((a, b) => a.value - b.value).slice(0, 10)

  const defaultData = Array(10).fill(null).map((_, index) => ({
    position: index + 1,
    userName: '------',
    score: 0
  }))

  const scoresToShow = showUserStats ? userScores : gameScores
  scoresToShow.forEach((score, index) => {
    defaultData[index] = {
      position: index + 1,
      userName: score.userName,
      score: score.value
    }
  })

  return (
    <article
      className='flex flex-col items-center justify-between gap-8 rounded-lg h-[550px] min-w-[350px] w-[400px] bg-[var(--dark-dark)] py-6 z-50'
      onClick={(e) => { e.stopPropagation() }}
    >
      <div className='w-full flex flex-col items-center gap-8'>
        <p className='text-2xl uppercase text-center text-primary font-bold'>{gameName}</p>

        <section className='flex_center_column gap-2 w-full'>
          {defaultData.map(({ position, userName, score }, index) => (
            <LeaderboardItem key={index} position={position} userName={userName} score={score} />
          ))}
        </section>
      </div>

      <div className='flex self-end px-8 pb-4 gap-3'>
          <Button
            variant="dark"
            className='w-auto'
            onClick={() => { setShowUserStats(false) }}
          >
            <GlobeIcon className='h-5 w-5' />
          </Button>

          <Button
            variant="dark"
            className='w-auto'
            onClick={() => { setShowUserStats(true) }}
          >
              <PersonIcon className='h-5 w-5' />
          </Button>
      </div>
    </article>
  )
}
