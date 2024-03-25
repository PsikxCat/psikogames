import { HomeButtons } from '@/components'
import Image from 'next/image'
import React from 'react'

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-between gap-5">
      <div className='min-w-[400px] pt-20'>
        <Image
          src={'/psikogames-logo.webp'}
          alt="psikogames logo"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className='flex-1 w-full flex flex-col items-center justify-evenly pb-28'>
        <h1 className='py-5 tracking-wider text-2xl text-primary uppercase font-bold'>Bienvenido extraño</h1>
        <HomeButtons />
      </div>

      <div className=' w-full'>
        <p className='text-center p-4'>
          PsikoGames es un sitio web de juegos en línea donde podras jugar y comparar tus puntuaciones con tus amigos.
        </p>
      </div>
    </main>
  )
}
