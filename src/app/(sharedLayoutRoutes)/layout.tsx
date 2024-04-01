import { SessionProvider } from 'next-auth/react'

import { Logo } from '@/components'
import { auth } from '@/auth'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (

    <SessionProvider session={session}>
      <main className="relative h-[100svh] w-full flex_center_column">
        <div className="absolute top-5 left-0 flex_center">
          <Logo size="md" />
        </div>

        <section className="h-full w-full">
          {children}
        </section>
      </main>
    </SessionProvider>
  )
}
