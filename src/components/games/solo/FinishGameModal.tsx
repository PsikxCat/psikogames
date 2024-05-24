import { type GameStatusType } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FinishGameModalProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatusType>>
  isGameWon: boolean
  resetGame: () => void
  mainLabel: string
  secondaryLabel?: string
}

export default function FinishGameModal({ setGameStatus, isGameWon, resetGame, mainLabel, secondaryLabel }: FinishGameModalProps) {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex_center_column z-50'>
      <div className='bg-black/80 px-4 py-8 rounded-lg w-[300px] flex_center_column gap-3'>
        {isGameWon
          ? (
            <>
              <h1 className='text-4xl text-primary font-semibold'>¡Ganaste!</h1>

              <div className='my-4'>
                <p className='text-center'>Tu tiempo: <span className='text-primary font-extrabold'>{mainLabel}</span></p>
              </div>
            </>
            )
          : (
            <>
              <h1 className='text-4xl text-primary font-semibold'>¡Perdiste!</h1>
              {secondaryLabel && <p className='text-center'>{secondaryLabel}</p>}
            </>
            )}

        <Button
          variant="main"
          size="sm"
          className='mb-4 w-auto'
          onClick={() => {
            setGameStatus({ isGameFinished: false, isGameWon: false })
            resetGame()
          }}
        >
          Volver a jugar
        </Button>

        {isGameWon && (
          <Button
            variant="dark"
            size="sm"
            className='w-auto'
            asChild
          >
            <Link href='/leaderboard'>
              Ir a stats
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
