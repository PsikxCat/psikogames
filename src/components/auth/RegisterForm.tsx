'use client'

import { useState, useTransition } from 'react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { RegisterSchema } from '@/schemas'
import { register } from '@/actions/register'
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
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      register(values)
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
    headerLabel='Crea una cuenta'
    backButtonLabel='¿Ya estas registrado?'
    backButtonHref='/auth/login'
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
            {/* nombre */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Nombre</FormLabel>

                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Psikocat'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
          <MessageError message={error} />
          <MessageSuccess message={success} />

          {/* botón submit */}
          <Button type='submit' variant='main' size='sm' className='mx-auto w-[50%]' >
            {!isPending && 'Crear usuario'}
            <Spinner visible={isPending} />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
