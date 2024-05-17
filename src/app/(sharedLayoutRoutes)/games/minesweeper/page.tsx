'use client'

import { Button } from '@/components/ui/button'
import { Minesweeper } from '@/components'

export default function MinesweeperGamePage() {
  return (
    <main className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Buscaminas
      </h1>

      <Button
        variant="main"
        className='w-auto mb-4'
        onClick={() => { console.log('startNewGame') }}
      >
        Nuevo juego
      </Button>
      <section className='flex_center_column gap-2 max-w-[700px] w-full'>
        <Minesweeper />
      </section>
    </main>

  )
}
