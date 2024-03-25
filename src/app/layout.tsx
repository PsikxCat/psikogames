import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'

import './globals.css'

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
      <body className={orbitron.className}>
        {children}
      </body>
    </html>
  )
}
