'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

import { verifyEmail, verifyCode, signup } from '@/app/signup/actions'
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
  verificationCode: string
  password: string
  confirmPassword: string
}

export default function SignupPage() {
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [timer, setTimer] = useState(0)
  const router = useRouter()

  const schema = z
    .object({
      email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
      password: z
        .string()
        .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
      verificationCode: z.string(),
      confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword']
    })
    .refine(() => isCodeSent, {
      message: '이메일 인증을 완료해주세요.',
      path: ['email']
    })
    .refine(() => isVerified, {
      message: '인증번호 확인을 완료해주세요.',
      path: ['verificationCode']
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (!isCodeSent || isVerified || timer <= 0) return

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsCodeSent(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isCodeSent, isVerified, timer])

  const handleEmailVerification = async () => {
    try {
      const email = getValues('email')

      // 이메일 형식이 유효한지 체크
      const schema = z.string().email('유효한 이메일을 입력하세요.')
      const result = schema.safeParse(email)
      if (!result.success) {
        setError('email', {
          type: 'manual',
          message: result.error.issues[0].message
        })
        return
      }

      clearErrors('email')
      const response = await verifyEmail(email)
      setIsCodeSent(true)
      setTimer(180)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleVerificationCode = async () => {
    try {
      const email = getValues('email')
      const verificationCode = getValues('verificationCode')
      const response = await verifyCode(email, verificationCode)
      setIsVerified(true)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await signup(
        data.email,
        data.password,
        data.verificationCode
      )
      toast.success(response.message)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
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
              <div className="flex space-y-0 space-x-2">
                <Input
                  className="flex-1"
                  placeholder="이메일"
                  type="email"
                  aria-label="이메일"
                  readOnly={isCodeSent}
                  {...register('email')}
                />

                <Button
                  type="button"
                  className="w-24"
                  disabled={isCodeSent}
                  onClick={handleEmailVerification}
                >
                  {isCodeSent && !isVerified
                    ? `${Math.floor(timer / 60)}분 ${timer % 60}초`
                    : '이메일 인증'}
                </Button>
              </div>
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>

            {isCodeSent && (
              <div className="space-y-1">
                <div className="flex space-y-0 space-x-2">
                  <Input
                    className="flex-1"
                    placeholder="인증번호"
                    aria-label="인증번호"
                    readOnly={isVerified}
                    {...register('verificationCode')}
                  />

                  <Button
                    type="button"
                    className="w-24"
                    disabled={isVerified}
                    onClick={handleVerificationCode}
                  >
                    인증번호 확인
                  </Button>
                </div>
                <p className="text-xs text-red-500">
                  {errors.verificationCode?.message}
                </p>
              </div>
            )}

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
