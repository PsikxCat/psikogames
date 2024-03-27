import { auth } from '@/auth'
import { HomeButtons, Logo } from '@/components'

export default async function HomePage() {
  const session = await auth()

  return (
    <main className="flex h-screen flex-col items-center justify-between gap-5">
      <div className='min-w-[400px] pt-20'>
        <Logo size='xl' />
      </div>

      <div className='flex-1 w-full flex flex-col items-center justify-evenly pb-28'>
        <h1 className='py-5 tracking-wider text-2xl text-primary uppercase font-bold'>
          Bienvenido {session?.user?.name ?? null}
        </h1>

        <HomeButtons />
      </div>

      <footer className='w-full py-4 flex_center_column gap-2 text-sm text-center'>
        <p>PsikoGames es un sitio web de juegos en línea donde podrás jugar y comparar tus puntuaciones con tus amigos.</p>

        <p className='text-[12px]'>
          <span className='copyleft text-sm'>&nbsp;&copy;</span>
          {new Date().getFullYear()} Psikocat.  Ningún derecho reservado.
        </p>
      </footer>
    </main>
  )
}
