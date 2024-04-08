'use client'

import { useState, useTransition } from 'react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SettingsSchema } from '@/schemas'
import { useCurrentUser } from '@/hooks/use-current-user'
import { settings } from '@/actions/settings'
import { MessageError, MessageSuccess, Spinner } from '@/components'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useSession } from 'next-auth/react'

export default function SettingsPage() {
  const user = useCurrentUser()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { update } = useSession()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name ?? undefined,
      email: user?.email ?? undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled ?? undefined
    }

  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      settings(values)
        .then(async (data) => {
          if (data.error) setError(data.error)

          if (data.success) {
            setSuccess(data.success)
            await update()
          }
        })
        .catch((error) => {
          console.error(error)
          setError('Error al actualizar la configuración')
        })
    })
  }

  return (
    <div className="h-full flex_center_column gap-10">
      <Card className="min-w-[400px] lg:w-1/3 shadow-md shadow-primary">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-primary">
            Configura tu cuenta
          </h2>
        </CardHeader>

        <CardContent>
          <Form {...form} >
            <form
              className='space-y-5'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* campos del formulario */}
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Psikocat'
                          type='text'
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* campos solo para usuarios logueados con credentials */}
                {!user?.isOAuth && (<>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder='psikxcat@gmail.com'
                            type='email'
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='isTwoFactorEnabled'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg py-2 shadow-sm'>
                        <div className='space-y-0.5'>
                          <FormLabel>Autenticación de dos factores</FormLabel>
                          <FormDescription>Activar la autenticacion 2FA para tu cuenta.</FormDescription>
                        </div>

                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña actual</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder='******'
                            type='password'
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nueva contraseña</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            placeholder='******'
                            type='password'
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>)}
              </div>

              {error && <MessageError message={error} />}
              {success && <MessageSuccess message={success} />}

              {/* botones */}
              <div className='flex justify-between items-center pb-3 pt-2'>
                <Button
                  className='w-auto'
                  type='submit'
                  variant='main'
                  disabled={isPending}
                >
                  {!isPending && 'Actualizar'}
                  <Spinner visible={isPending} />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
