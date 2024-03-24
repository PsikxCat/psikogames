import Image from 'next/image'

import { HomeButtons } from '@/components'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 border gap-10">
        <Image
          src={'/psikogames-logo.webp'}
          width={500}
          height={500}
          alt="PsikoGames"
        />

        <div className='border flex-1 w-full flex_center'>
          <HomeButtons />
        </div>
    </main>
  )
}
