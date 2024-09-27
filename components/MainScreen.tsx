'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MainScreen() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setSubscribed(true)
    setEmail("")
  }

  return (
    <main className="flex-1 flex items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                당신의 개발 커리어를 위한 첫걸음
              </h1>
              <p className="mx-auto text-sm text-gray-500 md:text-lg dark:text-gray-400">
                맞춤형 채용 정보, 관련 컨퍼런스, 유용한 기술 블로그 글을 한 곳에서 만나보세요.
              </p>
            </div>
            <div className="w-full max-w-md space-y-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
              >
                <Input
                  className="flex-1"
                  placeholder="이메일 주소 입력"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full sm:w-auto">
                  구독하기
                </Button>
              </form>
              {subscribed && (
                <p className="text-sm text-green-600" role="alert">
                  구독해 주셔서 감사합니다! 곧 맞춤형 취업 정보를 받아보실 수 있습니다.
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                주 1~2회 발송, 언제든 구독 취소 가능합니다. 개인정보는 안전하게 보호됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
