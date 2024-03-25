import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-full w-full border">
      <div className="flex_center_column gap-8 h-full w-full">
        <div className='flex_center gap-8'>
          <Button variant="main" asChild>
            <Link href='/home'>
              Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
