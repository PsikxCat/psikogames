'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ResetSchema } from '@/schemas'
import { reset } from '@/actions/reset'
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

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      reset(values)
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
    headerLabel='¿Olvidaste tu contraseña?'
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
          </div>

          {/* mensajes error/success */}
          <MessageError message={error} />
          <MessageSuccess message={success} />

          {/* botón submit */}
          <Button type='submit' variant='main' size='sm' className='w-full mx-auto' >
            {!isPending && 'Enviar correo de recuperación'}
            <Spinner visible={isPending} />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
