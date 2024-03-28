import { Logo } from '@/components'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex_center_column gap-y-[25svh] h-full w-full">
        <Logo size='xl' />

        <div className='flex_center'>
          <Button variant="main" size='lg' asChild>
            <Link href='/home'>
              Acceder
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
