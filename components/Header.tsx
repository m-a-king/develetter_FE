'use client'

import { Button } from "@/components/ui/button"
import { Mail, User, LogIn } from "lucide-react"
import { useOAuth } from "@/components/OAuthProvider"

export function Header() {
  const { openModal } = useOAuth()

  return (
    <header className="flex items-center h-14 px-4 md:px-6">
      <a className="flex items-center" href="#">
        <Mail className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">develetter</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" className="text-sm font-medium">
          소개
        </Button>
        <Button variant="ghost" className="text-sm font-medium">
          문의
        </Button>
      </nav>
      <div className="flex items-center gap-4 ml-4">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
          onClick={openModal}
        >
          <User className="mr-2 h-4 w-4" />
          회원가입
        </Button>
        <Button variant="default" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          로그인
        </Button>
      </div>
    </header>
  )
}
