'use client'

import Link from 'next/link'

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

export default function HomeButtons() {
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

        <Button
          variant="red"
          size='sm'
          asChild
          onClick={async () => { await logout() }}
        >
          <Link href='/auth/login'>salir</Link>
        </Button>
      </div>
    </div>
  )
}
