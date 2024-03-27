import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapper } from '@/components'

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='Algo salió mal...'
      backButtonHref='/auth/login'
      backButtonLabel='Volver al login'
    >
      <div className="flex_center gap-x-2">
        <ExclamationTriangleIcon className="h-10 w-10 text-destructive" />
      </div>
    </CardWrapper>)
}
