import React from 'react'
import LeaderboardCard from './LeaderboardCard'

interface StatsModalProps {
  gameName: string
  user: string
}

export default function StatsModal({ gameName, user }: StatsModalProps) {
  return (
    <div className='bg-black/80 flex_center text-center absolute inset-0'>
      <LeaderboardCard game={gameName} user={user} />
    </div>
  )
}
