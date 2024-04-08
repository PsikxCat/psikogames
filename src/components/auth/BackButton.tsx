'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  label: string
  href?: string
  variant?: 'link' | 'red'
}

export default function BackButton({ label, href, variant = 'link' }: BackButtonProps) {
  const router = useRouter()

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.back()
  }

  return (
    <Button
      variant={variant}
      size={'sm'}
      className={cn(`${variant === 'link' ? 'w-full font-normal' : 'w-auto font-semibold'}`)}
      asChild={!!href}
      onClick={!href ? goBack : undefined}
    >
      {href
        ? (
            <Link href={href}>
              {label}
            </Link>
          )
        : (
            <div>
              <FaArrowLeft className='block md:hidden' />
              <span className='hidden md:block'>{label}</span>
            </div>
          )
        }
    </Button>
  )
}
