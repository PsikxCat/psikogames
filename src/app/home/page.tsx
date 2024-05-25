import { auth } from '@/auth'
import { HomeButtons, Logo } from '@/components'

export default async function HomePage() {
  const session = await auth()

  return (
    <main className="flex_center_column min-h-[70svh] gap-5">
      <div className='min-w-[400px] pt-20 flex_center'>
        <Logo size='xl' />
      </div>

      <div className='flex-1 w-full flex flex-col items-center justify-evenly pb-28'>
        <h1 className='py-5 tracking-wider text-2xl text-primary uppercase font-bold'>
          Bienvenido {session?.user?.name ?? null}
        </h1>

        <HomeButtons />
      </div>
    </main>
  )
}
