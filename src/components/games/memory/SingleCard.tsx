'use client'

import { motion } from 'framer-motion'

import './SingleCard.css'

interface SingleCardProps {
  card: { src: string, id: string, found: boolean }
  flipped: boolean
  handleChoice: (card: { src: string, id: string, found: boolean }) => void
  isLoading: boolean
}

export default function SingleCard({ card, flipped, handleChoice, isLoading }: SingleCardProps) {
  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <motion.article whileHover={{ scale: 1.05, rotate: 1 }} className='card' >
      <div className={flipped ? 'flipped' : ''}>
        <motion.img
          animate={{ rotateY: flipped ? 0 : 90, opacity: flipped ? 1 : 0 }}
          className='front'
          src={card.src}
          alt="card front"
        />

        <motion.img
          animate={{ rotateY: flipped ? 90 : 0, opacity: flipped ? 0 : 1 }}
          className='back w-full'
          onClick={handleClick}
          src='https://icongr.am/entypo/help.svg?color=FF9B50'
          alt="card back"
        />
      </div>
    </motion.article>
  )
}
