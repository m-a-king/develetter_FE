import Link from 'next/link'
import { Mail } from 'lucide-react'

import { getUser } from '@/app/login/actions'
import { Account } from '@/components/account'

export async function Header() {
  const user = await getUser()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <Link href="/" className="flex items-center">
        <Mail className="size-5" />
        <span className="ml-2 text-lg font-bold">develetter</span>
      </Link>
      <div className="absolute right-4">
        <Account user={user} />
      </div>
    </header>
  )
}
