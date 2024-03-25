import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <div className="h-full flex_center_column gap-10">
      <p>
        Settings Page
      </p>

      <Button variant="dark" asChild>
        <Link href="/home">Home</Link>
      </Button>
    </div>
  )
}
