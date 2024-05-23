interface LeaderboardItemProps {
  data: any // ! TODO: Definir tipo de data
}

export default function LeaderboardItem({ data }: LeaderboardItemProps) {
  return (
    <div className='flex justify-between w-[75%]'>
      <div className='flex gap-4'>
        <span className='w-4 text-center text-secondary'>{data + 1}</span>
        <p className='text-xl'>Rick</p>
      </div>

      <p className='text-xl'>98</p>
    </div>

  )
}
