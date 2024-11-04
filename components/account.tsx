'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User as UserIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function Account() {
  const { data: session } = useSession()
  console.log(session)

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          ) : (
            <UserIcon fill="black" className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session ? (
          <>
            <DropdownMenuItem>
              <Link href="/mypage">마이페이지</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleLogout}>로그아웃</button>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/login">로그인</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signup">회원가입</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
