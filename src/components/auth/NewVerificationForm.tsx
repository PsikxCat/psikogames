'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { CardWrapper, FormError, FormSuccess, Spinner } from '@/components'
import { newVerification } from '@/actions/new-verification'

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const searchParams = useSearchParams()
  const [token, email] = [searchParams.get('token'), searchParams.get('email')]

  const handleSubmit = useCallback(() => {
    console.log(token, email)
    if (!token || !email) {
      setError('Token invalido!')
      return
    }

    newVerification(token, email)
      .then((data) => {
        console.log(data)
        setError(data.error)
        setSuccess(data.success)
      }).catch((error) => {
        console.error(error)
        setError('Algo salio mal! Intentalo de nuevo.')
      })
  }, [token, email])

  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <CardWrapper
      headerLabel='Verificando tu cuenta'
      backButtonLabel='Volver a login'
      backButtonHref='/auth/login'
    >
      <div className='flex_center_column w-full '>
        <Spinner visible={!success && !error}/>

        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
