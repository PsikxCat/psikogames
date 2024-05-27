import { Logo, BackButton } from '@/components'
import Link from 'next/link'
import { Toaster } from 'sonner'

import GamesProvider from '../../context/games-context/GamesProvider'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='flex_center_column h-full w-full'>
      <nav className="absolute top-0 h-[calc(50px+2vw)] w-full max-w-[1500px] flex items-center justify-between py-2">
        <Link href='/home' className='h-[calc(50px+2vw)]'>
          <Logo size="md" />
        </Link>

        <div className='pb-2 pr-3'>
          <BackButton label='Volver' variant='red' />
        </div>
      </nav>

      <main className="h-full w-full flex_center_column pt-[calc(60px+2vw)] pb-[calc(40px+2vw)]">
        <GamesProvider>
          <section className="h-full w-full">
            <Toaster richColors position='bottom-center' />
            {children}
          </section>
        </GamesProvider>
      </main>
    </section>
  )
}
