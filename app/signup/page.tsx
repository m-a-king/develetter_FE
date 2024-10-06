'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

import { signup } from '@/app/signup/actions'
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
  confirmPassword: string
}

const schema = z
  .object({
    email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  })

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signup(data.email, data.password)

      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error('예기치 못한 오류가 발생했습니다:', error)
    }
  }

  return (
    <div className="container mx-auto flex h-full max-w-md items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-4xl">회원가입</CardTitle>
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

            <div className="space-y-1">
              <Input
                placeholder="비밀번호 확인"
                type="password"
                aria-label="비밀번호 확인"
                {...register('confirmPassword')}
              />
              <p className="text-xs text-red-500">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </form>

          <div className="relative my-6 flex items-center">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-500">
              간편 회원가입
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
            <Link href="/login" className="text-xs underline">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
