import { getCurrentUser } from '@/lib/auth'
import { LeaderboardCard } from '@/components'

export default async function LeaderboardPage() {
  const user = await getCurrentUser()
  const userName = user!.name!

  // TODO: Capturar la data de la DB, por cada juego renderizar un componente con sus respectivos datos y os datos del usuario logueado asociado a ese juego
  // Se muestra inicialmente la data global, al hacer click en el icono de persona se muestra la data del usuario logueado
  return (
    <section className="h-full flex_center flex-wrap gap-5 ">
      <LeaderboardCard game="Memory" user={userName} />
      <LeaderboardCard game="Wordle" user={userName} />
      <LeaderboardCard game="Minesweeper" user={userName} />
    </section>
  )
}
