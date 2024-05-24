import React from 'react'
import LeaderboardCard from './LeaderboardCard'

interface StatsModalProps {
  gameName: string
  user: string
}

export default function StatsModal({ gameName, user }: StatsModalProps) {
  return (
    <div className='bg-black/80 flex_center text-center fixed top-0 left-0 w-full h-full'>
      <LeaderboardCard game={gameName} user={user} />
    </div>
  )
}
