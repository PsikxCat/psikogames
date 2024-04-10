import { Logo, BackButton } from '@/components'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='flex_center_column h-full w-full'>
      <nav className="absolute top-0 h-[calc(50px+2vw)] w-full max-w-[1500px] flex items-center justify-between py-2">
        <Logo size="md" />

        <div className='pb-2 pr-3'>
          <BackButton label='Volver' variant='red' />
        </div>
      </nav>

      <main className="h-full w-full flex_center_column py-[calc(60px+2vw)]">
        <section className="h-full w-full">
          {children}
        </section>
      </main>
    </section>
  )
}
