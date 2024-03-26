import Link from 'next/link'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div className="h-full flex_center_column gap-10">
      <p>
        {JSON.stringify(session)}
      </p>

      <Button variant="dark" asChild>
        <Link href="/home">Home</Link>
      </Button>
    </div>
  )
}
