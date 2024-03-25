import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface MessageErrorProps {
  message?: string
}

export default function MessageError({ message }: MessageErrorProps) {
  if (!message) return null

  return (
    <div>
      <div className='flex items-center bg-red-500/15 p-3 rounded-md gap-x-2 text-sm text-destructive'>
        <ExclamationTriangleIcon className='w-4 h-4' />
        <span>{message}</span>
      </div>
    </div>
  )
}
