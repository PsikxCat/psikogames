import formatTime from '@/utils/format-time'

interface LeaderboardItemProps {
  position: number
  userName: string
  score: number
}

export default function LeaderboardItem({ position, userName, score }: LeaderboardItemProps) {
  return (
    <div className='flex justify-between w-[75%] h-7'>
      <div className='flex items-center gap-4'>
        <span className='w-4 text-center text-secondary'>{position}</span>
        <p className='text-sm uppercase font-bold'>{userName}</p>
      </div>

      <p className='text-sm'>{ score === 0 ? '--:--' : formatTime(score) }</p>
    </div>

  )
}
