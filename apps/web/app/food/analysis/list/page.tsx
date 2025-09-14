'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import { AppSidebar } from '@/components/template/app-sidebar'
import { SiteHeader } from '@/components/template/site-header'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui/components/tooltip'
import { Eye, Clock, CreditCard, Zap, Utensils, ClipboardPlus, CheckCircle, XCircle } from 'lucide-react'
import { fetchFoodAnalysisList } from '../../foodAPI'
import type { FoodAnalysisListItem, FoodAnalysisResponse } from '@workspace/core/types'
import { formatCost, formatDuration, formatDate } from '@/lib/formatUtils'

// NG 상태를 확인하는 함수 (모든 음식의 X와 Y가 < 512이면 OK, 하나라도 >= 512이면 NG)
const isNG = (foods: any[]): boolean => {
  return foods.some((food) => food.position.x >= 512 || food.position.y >= 512)
}

// FoodAnalysisResponse를 FoodAnalysisListItem으로 변환하는 함수
const convertToListItem = (
  response: FoodAnalysisResponse
): FoodAnalysisListItem & { analysisMode: string; foods: any[] } => {
  return {
    id: response.id,
    modelName: response.usage?.modelName,
    imageWidth: Number(response.imageSize.split('x')[0]),
    imageHeight: Number(response.imageSize.split('x')[1]),
    requestDurationMs: response.usage?.requestDurationMs,
    totalTokens: response.usage?.totalTokens,
    totalCost: response.billing?.totalCost,
    createdAt: response.createdAt,
    analysisMode: response.analysisMode,
    foods: response.foods,
  }
}

const MODEL_FILTER_OPTIONS = [
  { value: 'all', label: '모든 모델' },
  { value: 'gpt-5', label: 'GPT-5' },
  { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
  { value: 'local-model', label: 'Local Model' },
]

export default function FoodAnalysisListPage() {
  const [analysisList, setAnalysisList] = useState<(FoodAnalysisListItem & { analysisMode: string; foods: any[] })[]>(
    []
  )
  const [filteredList, setFilteredList] = useState<(FoodAnalysisListItem & { analysisMode: string; foods: any[] })[]>(
    []
  )
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadAnalysisList = async () => {
      try {
        setIsLoading(true)
        const responseData = await fetchFoodAnalysisList()

        // 타입 가드 함수 추가 (외부에 빼도 좋음)
        function isFoodAnalysisResponseArray(data: unknown): data is FoodAnalysisResponse[] {
          return Array.isArray(data) && data.every((item) => 'id' in item && 'usage' in item && 'billing' in item)
        }

        // API가 FoodAnalysisResponse[]를 반환하므로 변환
        const convertedData = isFoodAnalysisResponseArray(responseData) ? responseData.map(convertToListItem) : []

        setAnalysisList(convertedData)
        setFilteredList(convertedData)
      } catch (err) {
        setError('분석 목록을 불러오는 중 오류가 발생했습니다.')
        console.error('List loading error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalysisList()
  }, [])

  // 모델 필터링 로직
  useEffect(() => {
    if (selectedModelFilter === 'all') {
      setFilteredList(analysisList)
    } else {
      const filtered = analysisList.filter((item) => item.modelName === selectedModelFilter)
      setFilteredList(filtered)
    }
  }, [selectedModelFilter, analysisList])

  const handleModelFilterChange = (value: string) => {
    setSelectedModelFilter(value)
  }

  const handleRowClick = (id: number) => {
    router.push(`/food/analysis/${id}`)
  }

  if (isLoading) {
    return (
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <div className="text-center">
                    <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
                    <p className="text-muted-foreground mt-2">분석 목록을 불러오는 중...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* 헤더 섹션 */}
              <div className="px-4 lg:px-6">
                <h1 className="mb-2 text-3xl font-bold">식사 분석 목록</h1>
                <p className="text-muted-foreground">이전 분석 결과들을 확인하고 관리하세요</p>
              </div>

              {/* 필터 섹션 */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>필터</CardTitle>
                    <CardDescription>원하는 조건으로 분석 결과를 필터링하세요</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <label htmlFor="model-filter" className="text-sm font-medium">
                          모델:
                        </label>
                        <Select value={selectedModelFilter} onValueChange={handleModelFilterChange}>
                          <SelectTrigger id="model-filter" className="w-40">
                            <SelectValue placeholder="모델 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {MODEL_FILTER_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="px-4 lg:px-6">
                  <Card className="border-destructive">
                    <CardContent className="pt-6">
                      <p className="text-destructive text-center">{error}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* 분석 목록 테이블 */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>분석 기록</CardTitle>
                    <CardDescription>총 {filteredList.length}개의 분석 결과가 있습니다</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredList.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">아직 분석 결과가 없습니다.</p>
                        <Button className="mt-4" onClick={() => router.push('/food/analysis')}>
                          첫 분석 시작하기
                        </Button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead className="w-16"></TableHead>
                              <TableHead className="w-16"></TableHead>
                              <TableHead>모델명</TableHead>
                              <TableHead>이미지 크기</TableHead>
                              <TableHead>사용 토큰</TableHead>
                              <TableHead>과금 USD (KRW ₩1,400 환율)</TableHead>
                              <TableHead>소요시간</TableHead>
                              <TableHead>생성일</TableHead>
                              <TableHead>액션</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredList.map((item) => (
                              <TableRow
                                key={item.id}
                                className="hover:bg-muted/50 cursor-pointer"
                                onClick={() => handleRowClick(item.id)}
                              >
                                <TableCell className="font-medium">#{item.id}</TableCell>
                                <TableCell>
                                  <div className="flex justify-center">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="cursor-help">
                                            {isNG(item.foods) ? (
                                              <XCircle className="h-5 w-5 text-red-500" />
                                            ) : (
                                              <CheckCircle className="h-5 w-5 text-green-500" />
                                            )}
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{isNG(item.foods) ? '이미지 밖 라벨 표시' : '이미지 안 라벨 표시'}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex justify-center">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="cursor-help">
                                            {item.analysisMode === 'IMG_ONLY' ? (
                                              <Utensils className="text-muted-foreground h-5 w-5" />
                                            ) : (
                                              <ClipboardPlus className="text-muted-foreground h-5 w-5" />
                                            )}
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            {item.analysisMode === 'IMG_ONLY'
                                              ? '식사 이미지 분석만'
                                              : '식사 이미지 분석과 사용자 상태에 따라 제안'}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{item.modelName || 'N/A'}</Badge>
                                </TableCell>
                                <TableCell>
                                  {item.imageWidth && item.imageHeight
                                    ? `${item.imageWidth} × ${item.imageHeight}`
                                    : 'N/A'}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Zap className="text-muted-foreground h-4 w-4" />
                                    {item.totalTokens?.toLocaleString() || 'N/A'}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <CreditCard className="text-muted-foreground h-4 w-4" />
                                    {formatCost(item.totalCost)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Clock className="text-muted-foreground h-4 w-4" />
                                    {formatDuration(item.requestDurationMs)}
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRowClick(item.id)
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
