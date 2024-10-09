'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User as UserIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { User } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface UserProps {
  user: User | null
}

export function Account({ user }: UserProps) {
  const handleLogout = async () => {
    await signOut({callbackUrl: '/'})
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {user?.image ? (
            <Image
              src={user.image}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          ) : (
            <UserIcon fill="black" className="size-4"/>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
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
              <Link href="/signup">회원가입</Link> {/* 회원가입 버튼 추가 */}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
