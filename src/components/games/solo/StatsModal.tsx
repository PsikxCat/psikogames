import LeaderboardCard from './LeaderboardCard'

interface StatsModalProps {
  gameName: string
  userId: string
}

export default function StatsModal({ gameName, userId }: StatsModalProps) {
  return (
    <div className='bg-black/80 flex_center text-center fixed top-0 left-0 w-full h-full'>
      <LeaderboardCard gameName={gameName} userId={userId} />
    </div>
  )
}
