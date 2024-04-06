'use client'

import { useState, useTransition } from 'react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { NewPasswordSchema } from '@/schemas'
import { CardWrapper, MessageError, MessageSuccess, Spinner } from '@/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { newPassword } from '@/actions/new-password'

export default function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const searchParams = useSearchParams()
  const [email, token] = [searchParams.get('email'), searchParams.get('token')]

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, email!, token!)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
        .catch((error) => {
          setError('Ocurrió un error inesperado')
          console.error(error)
        })
    })
  }

  return (
    <CardWrapper
      headerLabel='Actualizar contraseña'
      backButtonLabel='Volver al login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 flex flex-col'
        >
          {/* campos */}
          <div className='space-y-4'>
            {/* contraseña */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>
                    Nueva contraseña
                  </FormLabel>

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

            {/* confirmacion de contraseña */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>
                    Confirmar contraseña
                  </FormLabel>

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
          <MessageError message={error} />
          <MessageSuccess message={success} />

          {/* botón submit */}
          <Button type='submit' variant='main' size='sm' className='mx-auto w-[50%]' >
            {!isPending && 'Actualizar'}
            <Spinner visible={isPending} />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
