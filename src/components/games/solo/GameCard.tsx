import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CardWrapperProps {
  children: React.ReactNode
  imageSrc: string
  gameName: string
  playButtonHref: string
  statsButtonHref: string
}
export default function CardWrapper({
  children, imageSrc, gameName, playButtonHref, statsButtonHref
}: CardWrapperProps) {
  return (
    <Card className='min-w-[300px] max-w-[400px] aspect-[3/4] flex_center_column gap-3 shadow-md shadow-primary pb-3 overflow-hidden'>
      <CardHeader className='flex-1 bg-black w-full'>
        <Image src={imageSrc} width={400} height={200} alt='Game image' className='rounded-lg object-cover w-full'/>
      </CardHeader>

      <CardContent className='flex flex-col justify-between items-center w-full min-h-[200px]'>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold uppercase text-primary pb-3'>{gameName}</h3>

          <div className='text-sm'>
            {children}
          </div>
        </div>

        <div className='flex justify-evenly items-center pb-3 w-full'>
          <Button variant='main' size='sm' asChild>
            <Link href={playButtonHref}>Jugar</Link>
          </Button>

          <Button variant='dark' asChild>
            <Link href={statsButtonHref}>Stats</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
