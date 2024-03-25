import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'

const orbitron = Orbitron({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PSIKOGAMES',
  description: 'PsikoGames es un sitio web de juegos en línea donde podras jugar y comparar tus puntuaciones con tus amigos.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(
        'h-[100svh] w-full flex_center_column tracking-wider',
        orbitron.className
      )}>
        <main className='wrapper h-full'>
          {children}
        </main>
      </body>
    </html>
  )
}
