import Image from 'next/image'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative h-[100svh] flex_center_col">
      <div className="absolute top-5 left-0 flex_center ">
        <Image
          src="/psikogames-logo.webp"
          alt="psikogames logo"
          width={300}
          height={300}
          priority
        />
      </div>

      <section className="h-full w-full">
        {children}
      </section>
    </main>
  )
}
