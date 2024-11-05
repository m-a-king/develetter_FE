'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

import { subscribe } from './actions'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const categories = [
  {
    id: 'jobNames',
    label: '직무명',
    items: [
      { id: 'software-engineer', label: '소프트웨어 엔지니어' },
      { id: 'frontend-developer', label: '프론트엔드 개발자' },
      { id: 'backend-developer', label: '백엔드 개발자' },
      { id: 'fullstack-developer', label: '풀스택 개발자' },
      { id: 'devops-engineer', label: 'DevOps 엔지니어' },
      { id: 'data-scientist', label: '데이터 사이언티스트' },
      { id: 'ux-designer', label: 'UX 디자이너' },
      { id: 'business-analyst', label: '비즈니스 애널리스트' },
      { id: 'systems-administrator', label: '시스템 관리자' },
      { id: 'quality-assurance', label: '품질 보증 엔지니어' },
      { id: 'cyber-security-analyst', label: '사이버 보안 분석가' },
      { id: 'network-engineer', label: '네트워크 엔지니어' },
      { id: 'database-administrator', label: '데이터베이스 관리자' },
      { id: 'cloud-engineer', label: '클라우드 엔지니어' },
      { id: 'ai-engineer', label: 'AI 엔지니어' },
      { id: 'ml-engineer', label: '머신러닝 엔지니어' },
      { id: 'product-manager', label: '프로덕트 매니저' },
      { id: 'mobile-developer', label: '모바일 개발자' },
      { id: 'game-developer', label: '게임 개발자' },
      { id: 'blockchain-developer', label: '블록체인 개발자' }
    ]
  },
  {
    id: 'locationNames',
    label: '위치',
    items: [
      { id: 'seoul', label: '서울' },
      { id: 'busan', label: '부산' },
      { id: 'incheon', label: '인천' },
      { id: 'daegu', label: '대구' },
      { id: 'gwangju', label: '광주' },
      { id: 'daejeon', label: '대전' },
      { id: 'ulsan', label: '울산' },
      { id: 'jeju', label: '제주' },
      { id: 'suwon', label: '수원' },
      { id: 'changwon', label: '창원' },
      { id: 'seongnam', label: '성남' },
      { id: 'anyang', label: '안양' },
      { id: 'pohang', label: '포항' },
      { id: 'jeonju', label: '전주' },
      { id: 'gimhae', label: '김해' },
      { id: 'yeosu', label: '여수' },
      { id: 'cheongju', label: '청주' },
      { id: 'cheonju', label: '천안' },
      { id: 'gumi', label: '구미' },
      { id: 'gunsan', label: '군산' }
    ]
  },
  {
    id: 'jobTypeNames',
    label: '직무 유형',
    items: [
      { id: 'full-time', label: '정규직' },
      { id: 'contract', label: '계약직' },
      { id: 'internship', label: '인턴십' },
      { id: 'freelance', label: '프리랜서' },
      { id: 'remote', label: '원격근무' },
      { id: 'flexible-hours', label: '유연근무제' },
    ]
  },
  {
    id: 'industryNames',
    label: '산업',
    items: [
      { id: 'it', label: '정보 기술(IT)' },
      { id: 'finance', label: '금융' },
      { id: 'healthcare', label: '헬스케어' },
      { id: 'manufacturing', label: '제조업' },
      { id: 'education', label: '교육' },
      { id: 'real-estate', label: '부동산' },
      { id: 'retail', label: '소매업' },
      { id: 'transportation', label: '운송업' },
      { id: 'telecommunications', label: '통신' },
      { id: 'construction', label: '건설' },
      { id: 'entertainment', label: '엔터테인먼트' },
      { id: 'hospitality', label: '숙박 및 관광' },
      { id: 'energy', label: '에너지' },
      { id: 'automotive', label: '자동차' },
      { id: 'food-and-beverage', label: '식음료' },
      { id: 'pharmaceuticals', label: '제약' },
      { id: 'agriculture', label: '농업' },
      { id: 'mining', label: '광업' },
      { id: 'government', label: '공공' },
      { id: 'nonprofit', label: '비영리' }
    ]
  },
  {
    id: 'educationLevelNames',
    label: '학력',
    items: [
      { id: 'highschool', label: '고등학교 졸업' },
      { id: 'associate-degree', label: '전문 학사' },
      { id: 'bachelor-degree', label: '학사' },
      { id: 'master-degree', label: '석사' },
      { id: 'doctorate-degree', label: '박사' },
      { id: 'online-degree', label: '온라인 학위' },
      { id: 'trade-school', label: '직업 학교' },
      { id: 'no-degree-required', label: '학력 무관' },
    ]
  },
  {
    id: 'blogKeywords',
    label: '블로그 키워드',
    items: [
      { id: 'web-development', label: '웹 개발' },
      { id: 'career-tips', label: '커리어 팁' },
      { id: 'coding-best-practices', label: '코딩 베스트 프랙티스' },
      { id: 'design-thinking', label: '디자인 사고' },
      { id: 'entrepreneurship', label: '기업가 정신' },
      { id: 'project-management', label: '프로젝트 관리' },
      { id: 'productivity-hacks', label: '생산성 팁' },
      { id: 'remote-work', label: '원격 근무' },
      { id: 'self-improvement', label: '자기계발' },
      { id: 'startup', label: '스타트업' },
      { id: 'technology-trends', label: '기술 트렌드' },
      { id: 'freelancing', label: '프리랜싱' },
      { id: 'digital-marketing', label: '디지털 마케팅' },
      { id: 'data-science', label: '데이터 사이언스' },
      { id: 'ai-ml', label: 'AI & 머신러닝' },
      { id: 'cybersecurity', label: '사이버 보안' },
      { id: 'blockchain', label: '블록체인' },
      { id: 'coding-interview', label: '코딩 인터뷰' },
      { id: 'personal-finance', label: '개인 재무 관리' }
    ]
  }
] as const

const displayFormSchema = z.object({
  jobNames: z.array(z.string()).optional(),
  locationNames: z.array(z.string()).optional(),
  jobTypeNames: z.array(z.string()).optional(),
  industryNames: z.array(z.string()).optional(),
  educationLevelNames: z.array(z.string()).optional(),
  blogKeywords: z.array(z.string()).optional()
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

const defaultValues: Partial<DisplayFormValues> = {
  jobNames: [],
  locationNames: [],
  jobTypeNames: [],
  industryNames: [],
  educationLevelNames: [],
  blogKeywords: []
}

export default function SubscribeForm() {
  const { data: session, update } = useSession()

  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: defaultValues
  })

  const { setValue, handleSubmit, watch } = form
  const selectedItems = watch()

  useEffect(() => {
    if (session?.user?.subscriptions) {
      Object.entries(session.user.subscriptions).forEach(([key, value]) => {
        setValue(key as keyof DisplayFormValues, value)
      })
    }
  }, [session?.user?.subscriptions, setValue])

  const toggleItem = (categoryId: keyof DisplayFormValues, itemId: string) => {
    const currentItems = selectedItems[categoryId] || []
    const updatedItems = currentItems.includes(itemId)
      ? currentItems.filter(id => id !== itemId)
      : [...currentItems, itemId]

    setValue(categoryId, updatedItems)
  }

  const onSubmit = async (data: DisplayFormValues) => {
    try {
      await update({
        user: {
          ...session?.user,
          subscriptions: selectedItems,
        }
      })
      toast.success('구독 설정이 저장되었습니다.')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobNames"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">구독</FormLabel>
                <FormDescription>
                  관심 있는 개발 분야를 선택하세요! 선택한 카테고리에 맞는 최신
                  정보와 유용한 소식을 이메일로 받아보실 수 있습니다.
                  <br />
                  매주 유익한 개발 이야기를 놓치지 마세요!
                </FormDescription>
              </div>
              <FormField
                control={form.control}
                name="jobNames"
                render={() => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Table>
                          <TableBody>
                            {categories.map(category => (
                              <TableRow
                                key={category.id}
                                className="hover:bg-white"
                              >
                                <TableCell className="min-w-24 border-r font-medium">
                                  {category.label}
                                </TableCell>
                                <TableCell className="flex flex-wrap gap-2 p-4">
                                  {category.items.map(item => (
                                    <Toggle
                                      key={item.id}
                                      variant="outline"
                                      pressed={selectedItems[
                                        category.id
                                      ]?.includes(item.label)}
                                      onPressedChange={() =>
                                        toggleItem(
                                          category.id as keyof DisplayFormValues,
                                          item.label
                                        )
                                      }
                                    >
                                      {item.label}
                                    </Toggle>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </FormControl>
                      <FormLabel className="font-normal"></FormLabel>
                    </FormItem>
                  )
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">구독하기</Button>
      </form>
    </Form>
  )
}
