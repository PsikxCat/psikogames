import Image from 'next/image'

interface LogoProps {
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Logo({ size }: LogoProps) {
  return (
    <Image
      className='object-cover'
      src="/psikogames-logo.webp"
      alt="psikogames logo"
      style={{ width: 'auto', height: '100%' }}
      width={size === 'sm' ? 200 : size === 'md' ? 300 : size === 'lg' ? 400 : 500}
      height={size === 'sm' ? 200 : size === 'md' ? 300 : size === 'lg' ? 400 : 500}
    />
  )
}
