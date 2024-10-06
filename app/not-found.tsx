import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-start justify-center p-8 md:items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">404</CardTitle>
          <CardDescription>This page could not be found.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Go to our home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
