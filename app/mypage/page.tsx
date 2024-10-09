'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: '표시할 이메일을 선택하세요.'
    })
    .email()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {}

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  function onSubmit(data: ProfileFormValues) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">프로필</FormLabel>
                <FormDescription>
                  인증된 이메일 주소로 선택한 카테고리에 맞는 최신 정보와 유용한
                  소식을 전달해드립니다.
                </FormDescription>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <Input
                      placeholder="이메일"
                      type="email"
                      aria-label="이메일"
                      readOnly
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />
        <Button>로그아웃</Button>
      </form>
    </Form>
  )
}
