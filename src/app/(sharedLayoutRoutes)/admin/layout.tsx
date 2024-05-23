import { getCurrentRole } from '@/lib/auth'
import { FormError } from '@/components'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const role = await getCurrentRole()

  if (role !== 'ADMIN') {
    return (
      <div className='flex_center text-center'>
        <FormError message='No tienes autorización para ver este contenido' />
      </div>
    )
  }

  return (
    <>{children}</>
  )
}
