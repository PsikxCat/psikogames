'use client'

import { useState, useTransition } from 'react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { NewGameModelSchema } from '@/schemas'
import { createGameModel } from '@/actions/create-game-model'
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
import { Textarea } from '@/components/ui/textarea'

export default function GameModelForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(NewGameModelSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: ''
    }
  })

  const onSubmit = (values: z.infer<typeof NewGameModelSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      createGameModel(values)
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
      headerLabel='Crear modelo de juego'
      backButtonLabel='Volver a juegos'
      backButtonHref='/games'
    >
      <Form {...form}>
        <form
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
                  <FormLabel htmlFor='name'>Nombre</FormLabel>

                  <FormControl>
                    <Input
                      type='text'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* descripcion */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='description'>Descripción</FormLabel>

                  <FormControl>
                    <Textarea
                      className='bg-white text-black'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* url de imagen */}
            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='imageUrl'>URL de imagen</FormLabel>

                  <FormControl>
                    <Input
                      type='text'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* mensajes de error/success */}
          <MessageError message={error} />
          <MessageSuccess message={success} />

          {/* boton */}
          <Button type='submit' variant='main' size='md' className='mx-auto w-[50%]'>
            {!isPending && 'Crear modelo'}
            <Spinner visible={isPending} />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
