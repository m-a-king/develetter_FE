import { Button } from '@/components/ui/button'

export default function MainPage() {
  return (
    <div className="container max-w-5xl h-full flex flex-col items-center justify-center space-y-12 text-center break-keep">
      <header className="space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          당신의 개발 커리어를 위한 첫걸음
        </h1>

        <p className="text-md sm:text-lg md:text-xl text-gray-500 dark:text-gray-400">
          맞춤형 채용 정보, 관련 컨퍼런스, 유용한 기술 블로그 글을 한 곳에서
          만나보세요.
        </p>
      </header>

      <section className="space-y-4 max-w-md">
        <Button className="w-full px-6 py-3">구독하기</Button>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          주 1~2회 발송, 언제든 구독 취소 가능합니다. 개인정보는 안전하게
          보호됩니다.
        </p>
      </section>
    </div>
  )
}
