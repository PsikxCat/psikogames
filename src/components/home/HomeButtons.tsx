'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Spinner } from '@/components'
import { Button } from '@/components/ui/button'

export default function HomeButtons() {
  const [isPending, setIsPending] = useState(false)

  return (
    <div className="flex_center_column gap-12">
      <div className='flex_center gap-10'>
        <Button variant="main" size='lg' asChild>
          <Link href='/games'>
            jugar
          </Link>
        </Button>

        <Button variant="main" size='lg' asChild>
          <Link href='/leaderboard'>puntuaciones</Link>
        </Button>
      </div>

      <div className='flex_center gap-4'>
        <Button variant="dark" size='sm' asChild>
          <Link href='/settings'>select</Link>
        </Button>

        <Button variant="red" size='sm' asChild>
          <Link href='/auth/login'>salir</Link>
        </Button>

        <Button
          variant="dark"
          size='sm'
          onClick={() => { setIsPending((prev) => !prev) }}
          disabled={isPending}
        >
          {!isPending && 'action'}
          <Spinner visible={isPending} />
        </Button>
      </div>
    </div>
  )
}
