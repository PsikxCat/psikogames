import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import './globals.css'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'

const orbitron = Orbitron({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PsikoGames',
  description: 'PsikoGames es un sitio web de juegos en línea donde podrás jugar y comparar tus puntuaciones con tus amigos.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={cn(
          'min-h-[100svh] w-full flex_center_column tracking-wider',
          orbitron.className
        )}>
          <main className='wrapper h-full flex-1'>
            {children}
          </main>

          <footer className='w-full py-4 text-sm text-center'>
            <p className='text-[12px]'>
              <span className='copyleft text-sm'>&nbsp;&copy;</span>
              {new Date().getFullYear()} Psikocat.  Ningún derecho reservado.
            </p>
          </footer>
        </body>
      </SessionProvider>
    </html>
  )
}
