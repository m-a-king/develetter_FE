'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User as UserIcon } from 'lucide-react'
import Cookies from 'js-cookie';

import { logout } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function Account() {
  const router = useRouter()
  const accessToken = Cookies.get('accessToken') || '';

  const handleLogout = async () => {
    try {
      await logout(accessToken)
      router.push('/')
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
          <UserIcon fill="black" className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {accessToken ? (
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
