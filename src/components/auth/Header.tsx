import { Logo } from '@/components'

interface HeaderProps {
  label: string
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className='flex_center_column w-full gap-y-4'>
      {/* <h1 className='text-3xl font-semibold'>
        🔐 Auth
      </h1> */}
      <Logo size='sm' />

      <p className='text-primary font-bold uppercase text-md'>
        {label}
      </p>
    </div>
  )
}
