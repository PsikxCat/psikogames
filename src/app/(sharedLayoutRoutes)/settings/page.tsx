'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { Button } from '@/components/ui/button'
import { logout } from '@/actions/logout'

export default function SettingsPage() {
  const user = useCurrentUser()

  return (
    <div className="h-full flex_center_column gap-10">
      <p>
        {JSON.stringify(user, null, 2)}
      </p>

      <Button variant="red" onClick={async () => { await logout() }}>
        Salir
      </Button>
    </div>
  )
}
