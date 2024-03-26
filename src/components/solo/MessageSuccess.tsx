import { CheckCircledIcon } from '@radix-ui/react-icons'

interface MessageSuccessProps {
  message?: string
}

export default function MessageSuccess({ message }: MessageSuccessProps) {
  if (!message) return null

  return (
    <div>
      <div className='flex items-center bg-emerald-500/15 p-3 rounded-md gap-x-2 text-[11px] text-emerald-500'>
        <CheckCircledIcon className='w-4 h-4' />
        <span>{message}</span>
      </div>
    </div>
  )
}
