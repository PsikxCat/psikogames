'use client'

import { motion } from 'framer-motion'

import { type GameStatusType } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface FinishGameModalProps {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatusType>>
  isGameWon: boolean
  resetGame: () => void
  mainLabel: string
  secondaryLabel?: string
}

const modalAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
}

export default function FinishGameModal({ setGameStatus, isGameWon, resetGame, mainLabel, secondaryLabel }: FinishGameModalProps) {
  const [show, setShow] = useState(false)

  // Retardo de 900ms antes de mostrar el modal
  useEffect(() => {
    const timer = setTimeout(() => { setShow(true) }, 900)
    return () => { clearTimeout(timer) }
  }, [])

  if (!show) return null

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex_center_column z-50'>
      <motion.section
        className='bg-black/90 px-4 py-8 rounded-lg w-[300px] flex_center_column gap-3'
        {...modalAnimation}
      >
        {isGameWon
          ? (
            <>
              <h1 className='text-4xl text-primary font-semibold'>¡Ganaste!</h1>

              <div className='my-4'>
                <p className='text-center'>Tu tiempo: <span className='text-primary font-extrabold'>{mainLabel}</span></p>
                {secondaryLabel && <p className='text-center'>{secondaryLabel}</p>}
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
      </motion.section>
    </div>
  )
}
