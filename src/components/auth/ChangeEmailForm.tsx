'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { CardWrapper, FormError, FormSuccess, Spinner } from '@/components'
import { changeEmail } from '@/actions/change-email'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function ChangeEmailForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const user = useCurrentUser()
  const currentEmail = user?.email

  const searchParams = useSearchParams()
  const [token, newEmail] = [searchParams.get('token'), searchParams.get('email')]

  const handleSubmit = useCallback(() => {
    if (!token || !newEmail) {
      setError('Token invalido!')
      return
    }

    changeEmail(currentEmail!, token, newEmail)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      }).catch((error) => {
        console.error(error)
        setError('Algo salio mal! Intentalo de nuevo.')
      })
  }, [currentEmail, token, newEmail])

  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <CardWrapper
      headerLabel='Verificando tu cuenta'
      backButtonLabel='Volver'
      backButtonHref='/home'
    >
      <div className='flex_center_column w-full '>
        <Spinner visible={!success && !error}/>

        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
