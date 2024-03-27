'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { Button } from '@/components/ui/button'

export default function Social() {
  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
      .then(() => { console.log('Iniciando sesión') })
      .catch(() => { console.error('Error al iniciar sesión') })
  }

  return (
    <div className="flex_center w-full gap-x-2">
      <Button
        className='w-[33%]'
        size='sm'
        variant='dark'
        onClick={() => { handleClick('google') }}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>

      <Button
        className='w-[33%]'
        size='sm'
        variant='dark'
        onClick={() => { handleClick('github') }}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  )
}
