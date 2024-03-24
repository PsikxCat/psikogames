import { Button } from '@/components/ui/button'

export default function HomeButtons() {
  return (
    <div className="flex_center">
      <Button variant="secondary" size="lg">
        Jugar
      </Button>

      <Button variant="outline" size="lg">
        Iniciar sesión
      </Button>

      <Button variant="link" size="lg">
        Registrarse
      </Button>
    </div>
  )
}
