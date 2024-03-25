import { BackButton, Header, Social } from '@/components'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}
export default function CardWrapper({
  children, headerLabel, backButtonLabel, backButtonHref, showSocial
}: CardWrapperProps) {
  return (
    <Card className='w-[400px] shadow-md shadow-primary'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>

      {showSocial && (
        <CardFooter className='mt-4 mb-2'>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  )
}
