'use client'

import { type Dispatch, type SetStateAction, forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import type { CardType } from '@/types'
import { cardsImages } from '@/constants'
import { SingleCard } from '@/components'
import { Skeleton } from '@/components/ui/skeleton'

interface CardsTableProps {
  setTurn: Dispatch<SetStateAction<number>>
  setElapsedTime: Dispatch<SetStateAction<number>>
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>
  setIsGameFinished: Dispatch<SetStateAction<boolean>>
}

interface CardsTableRef {
  shuffleCards: () => void
}

function CardsTable(
  { setTurn, setElapsedTime, setIsTimerRunning, setIsGameFinished }: CardsTableProps, ref: React.Ref<CardsTableRef>
) {
  const [cards, setCards] = useState<CardType[] | []>([])
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null)
  const [isBoardBlocked, setIsBoardBlocked] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // | Efectos | /////////////////////////////////////////////
  // Inicializar las cartas de forma aleatoria
  useEffect(() => {
    shuffleCards()
    setTimeout(() => { setIsLoading(false) }, 500)
  }, [])

  // Comparar las cartas y actualizar el estado del juego
  useEffect(() => {
    if ((choiceOne && choiceTwo)) {
      setIsBoardBlocked(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => prevCards.map((card) => card.src === choiceOne.src ? { ...card, found: true } : card))
        resetTurn()
      } else {
        setTimeout(() => { resetTurn() }, 600)
      }
    }
  }, [choiceOne, choiceTwo])

  // Parar el temporizador si todas las cartas han sido encontradas
  useEffect(() => {
    if (cards.every((card) => card.found)) {
      setIsTimerRunning(false)
      setIsGameFinished(true)
    }
  }, [cards])

  // | Funciones | ///////////////////////////////////////////
  const shuffleCards = (): void => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID(), found: false }))

    setCards(shuffledCards)
    setTurn(0)
    setIsTimerRunning(false)
    setElapsedTime(0)
  }

  useImperativeHandle(ref, () => ({
    shuffleCards
  }))

  const handleChoice = (card: CardType): void => {
    if (isBoardBlocked) return
    if (!choiceOne) {
      setChoiceOne(card)
      setIsTimerRunning(true)
    } else setChoiceTwo(card)
  }

  const resetTurn = (): void => {
    setTurn((prevTurn: number) => prevTurn + 1)

    setChoiceOne(null)
    setChoiceTwo(null)
    setIsBoardBlocked(false)
    setIsGameFinished(false)
  }

  return (
    <section className="px-8 grid grid-cols-4 gap-2 sm:gap-5 sm:grid-cols-5 w-full">
      {isLoading
        ? (
            Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className='min-w-[50px] max-w-[150px] aspect-square' />
            ))
          )
        : (
            cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={choiceOne?.id === card.id || choiceTwo?.id === card.id || card.found}
            isLoading={isLoading}
          />
            ))
          )}
    </section>
  )
}

export default forwardRef(CardsTable)
