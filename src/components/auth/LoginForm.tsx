/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'
import { login } from '@/actions/login'
import { CardWrapper, MessageError, MessageSuccess, Spinner } from '@/components'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Este correo ya esta registrado con otro metodo de autenticacion'
    : ''

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
        .catch((error) => {
          setError('Error en el servidor.')
          console.error(error)
        })
    })
  }

  return (
    <CardWrapper
    headerLabel='Bienvenido de vuelta'
    backButtonLabel='¿No estas registrado?'
    backButtonHref='/auth/register'
    showSocial
    >
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 flex flex-col'
        >
          {/* campos */}
          <div className='space-y-4'>
            {/* correo */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Email</FormLabel>

                  <FormControl>
                    <Input
                      type='email'
                      placeholder='tucorreo@email.com'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* contraseña */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Contraseña</FormLabel>

                  <FormControl>
                    <Input
                      type='password'
                      placeholder='******'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* mensajes error/success */}
          <MessageError message={error || urlError} />
          <MessageSuccess message={success} />

          {/* botón submit */}
          <Button type='submit' variant='main' size='sm' className='mx-auto w-[50%]' >
            {!isPending && 'Iniciar sesión'}
            <Spinner visible={isPending} />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
