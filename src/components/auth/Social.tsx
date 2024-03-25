'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

export default function Social() {
  return (
    <div className="flex_center w-full gap-x-2">
      <Button
        className='w-[33%]'
        size='sm'
        variant='dark'
        onClick={() => { console.log('google') }}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>

      <Button
        className='w-[33%]'
        size='sm'
        variant='dark'
        onClick={() => { console.log('github') }}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  )
}
