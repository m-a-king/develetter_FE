'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

import { login } from '@/app/login/actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type FormData = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
})

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
      router.push('/')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="container mx-auto flex h-full max-w-md items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-4xl">로그인</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Input
                placeholder="이메일"
                type="email"
                aria-label="이메일"
                {...register('email')}
              />
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>

            <div className="space-y-1">
              <Input
                placeholder="비밀번호"
                type="password"
                aria-label="비밀번호"
                {...register('password')}
              />
              <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>

            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>

          <div className="relative my-6 flex items-center">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-500">
              간편 로그인
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <Button className="size-12 rounded-full bg-yellow-400 hover:bg-yellow-500">
              <Image
                src="/kakao-logo.png"
                alt="카카오 로고"
                width={24}
                height={24}
              />
            </Button>

            <Button className="size-12 rounded-full bg-green-500 hover:bg-green-600">
              <Image
                src="/naver-logo.png"
                alt="네이버 로고"
                width={24}
                height={24}
              />
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full flex justify-center">
            <Link href="/signup" className="text-xs underline">
              회원가입
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
