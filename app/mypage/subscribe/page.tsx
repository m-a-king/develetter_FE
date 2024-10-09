'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
    id: 'development',
    label: '개발',
    items: [
      { id: 'javascript', label: 'JavaScript' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'nodejs', label: 'Node.js' },
      { id: 'react', label: 'React' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'python', label: 'Python' },
      { id: 'django', label: 'Django' },
      { id: 'flask', label: 'Flask' },
      { id: 'java', label: 'Java' },
      { id: 'spring', label: 'Spring' },
      { id: 'kotlin', label: 'Kotlin' },
      { id: 'go', label: 'Go' },
      { id: 'ruby', label: 'Ruby' },
      { id: 'rails', label: 'Rails' },
      { id: 'php', label: 'PHP' },
      { id: 'laravel', label: 'Laravel' },
      { id: 'csharp', label: 'C#' },
      { id: 'dotnet', label: '.NET' },
      { id: 'cplusplus', label: 'C++' },
      { id: 'rust', label: 'Rust' },
      { id: 'scala', label: 'Scala' },
      { id: 'elixir', label: 'Elixir' },
      { id: 'swift', label: 'Swift' },
      { id: 'objective-c', label: 'Objective-C' },
      { id: 'android', label: 'Android 개발' }
    ]
  },
  {
    id: 'planning',
    label: '기획',
    items: [
      { id: 'market-research', label: '시장 조사' },
      { id: 'user-flow', label: '사용자 흐름' },
      { id: 'wireframe', label: '와이어프레임' },
      { id: 'project-management', label: '프로젝트 관리' },
      { id: 'requirement-analysis', label: '요구사항 분석' },
      { id: 'stakeholder-management', label: '이해관계자 관리' },
      { id: 'timeline-planning', label: '타임라인 기획' },
      { id: 'risk-management', label: '위험 관리' },
      { id: 'resource-allocation', label: '자원 할당' },
      { id: 'kpi-setting', label: 'KPI 설정' },
      { id: 'agile-methodology', label: '애자일 방법론' },
      { id: 'scrum', label: '스크럼' },
      { id: 'kanban', label: '칸반' },
      { id: 'waterfall', label: '폭포수 모델' },
      { id: 'business-analysis', label: '비즈니스 분석' },
      { id: 'budgeting', label: '예산 관리' },
      { id: 'milestone-setting', label: '마일스톤 설정' },
      { id: 'feature-prioritization', label: '기능 우선순위 설정' },
      { id: 'roadmap-creation', label: '로드맵 작성' },
      { id: 'customer-feedback', label: '고객 피드백 수집' },
      { id: 'competitive-analysis', label: '경쟁 분석' },
      { id: 'innovation-planning', label: '혁신 기획' },
      { id: 'persona-creation', label: '페르소나 작성' },
      { id: 'product-lifecycle', label: '제품 수명주기 관리' }
    ]
  },
  {
    id: 'design',
    label: '디자인',
    items: [
      { id: 'ui-ux', label: 'UI/UX 디자인' },
      { id: 'figma', label: 'Figma' },
      { id: 'adobe-xd', label: 'Adobe XD' },
      { id: 'sketch', label: 'Sketch' },
      { id: 'prototyping', label: '프로토타이핑' },
      { id: 'graphic-design', label: '그래픽 디자인' },
      { id: 'illustrator', label: 'Illustrator' },
      { id: 'photoshop', label: 'Photoshop' },
      { id: 'indesign', label: 'InDesign' },
      { id: 'responsive-design', label: '반응형 디자인' },
      { id: 'interaction-design', label: '인터랙션 디자인' },
      { id: 'web-design', label: '웹 디자인' },
      { id: 'mobile-design', label: '모바일 디자인' },
      { id: 'typography', label: '타이포그래피' },
      { id: 'color-theory', label: '색 이론' },
      { id: 'branding', label: '브랜딩 디자인' },
      { id: 'motion-design', label: '모션 디자인' },
      { id: '3d-design', label: '3D 디자인' },
      { id: 'animation', label: '애니메이션' },
      { id: 'icon-design', label: '아이콘 디자인' },
      { id: 'layout-design', label: '레이아웃 디자인' },
      { id: 'design-systems', label: '디자인 시스템' },
      { id: 'design-thinking', label: '디자인 사고' },
      { id: 'accessibility-design', label: '접근성 디자인' }
    ]
  },
  {
    id: 'marketing',
    label: '마케팅',
    items: [
      { id: 'seo', label: '검색 엔진 최적화(SEO)' },
      { id: 'content-marketing', label: '콘텐츠 마케팅' },
      { id: 'social-media', label: '소셜 미디어 마케팅' },
      { id: 'email-marketing', label: '이메일 마케팅' },
      { id: 'branding', label: '브랜딩' },
      { id: 'paid-advertising', label: '유료 광고' },
      { id: 'influencer-marketing', label: '인플루언서 마케팅' },
      { id: 'affiliate-marketing', label: '제휴 마케팅' },
      { id: 'content-creation', label: '콘텐츠 제작' },
      { id: 'copywriting', label: '카피라이팅' },
      { id: 'video-marketing', label: '비디오 마케팅' },
      { id: 'pr', label: '홍보(PR)' },
      { id: 'event-marketing', label: '이벤트 마케팅' },
      { id: 'community-management', label: '커뮤니티 관리' },
      { id: 'growth-hacking', label: '성장 해킹' },
      { id: 'crm', label: '고객 관계 관리(CRM)' },
      { id: 'lead-generation', label: '리드 생성' },
      { id: 'analytics', label: '분석 및 리포트' },
      { id: 'conversion-optimization', label: '전환율 최적화' },
      { id: 'customer-retention', label: '고객 유지' },
      { id: 'ecommerce-marketing', label: '전자상거래 마케팅' },
      { id: 'product-marketing', label: '제품 마케팅' },
      { id: 'brand-strategy', label: '브랜드 전략' },
      { id: 'market-research', label: '시장 조사' }
    ]
  }
] as const

const displayFormSchema = z.object({
  items: z.array(z.string()).min(1, '최소 한 개의 항목을 선택해야 합니다.')
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

const defaultValues: Partial<DisplayFormValues> = {
  items: []
}

export default function SubscribeForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: defaultValues
  })

  const { setValue, handleSubmit, watch } = form
  const selectedItems = watch('items')

  const toggleItem = (itemId: string) => {
    const currentItems = selectedItems || []
    const updatedItems = currentItems.includes(itemId)
      ? currentItems.filter(id => id !== itemId)
      : [...currentItems, itemId]

    setValue('items', updatedItems)
  }

  function onSubmit(data: DisplayFormValues) {
    console.log(data.items)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
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
                name="items"
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
                                      pressed={selectedItems.includes(item.id)}
                                      onPressedChange={() =>
                                        toggleItem(item.id)
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
