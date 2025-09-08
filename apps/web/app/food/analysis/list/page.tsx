'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { AppSidebar } from '@/components/template/app-sidebar'
import { SiteHeader } from '@/components/template/site-header'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { Eye, Clock, CreditCard, Zap } from 'lucide-react'
import { fetchFoodAnalysisList } from '../../foodAPI'
import type { FoodAnalysisListItem, FoodAnalysisResponse } from '@workspace/core/types'
import { formatCost, formatDuration, formatDate } from '@/lib/formatUtils'

// FoodAnalysisResponse를 FoodAnalysisListItem으로 변환하는 함수
const convertToListItem = (response: FoodAnalysisResponse): FoodAnalysisListItem => {
  return {
    id: response.id,
    modelName: response.usage?.modelName,
    imageWidth: Number(response.imageSize.split('x')[0]),
    imageHeight: Number(response.imageSize.split('x')[1]),
    requestDurationMs: response.usage?.requestDurationMs,
    totalTokens: response.usage?.totalTokens,
    totalCost: response.billing?.totalCost,
    createdAt: new Date().toISOString(), // 기본값 또는 실제 생성일
  }
}

export default function FoodAnalysisListPage() {
  const [analysisList, setAnalysisList] = useState<FoodAnalysisListItem[]>([])
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
      } catch (err) {
        setError('분석 목록을 불러오는 중 오류가 발생했습니다.')
        console.error('List loading error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalysisList()
  }, [])

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
                <h1 className="mb-2 text-3xl font-bold">식사 이미지 분석 목록</h1>
                <p className="text-muted-foreground">이전 분석 결과들을 확인하고 관리하세요</p>
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
                    <CardDescription>총 {analysisList.length}개의 분석 결과가 있습니다</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysisList.length === 0 ? (
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
                              <TableHead>모델명</TableHead>
                              <TableHead>이미지 크기</TableHead>
                              <TableHead>사용 토큰</TableHead>
                              <TableHead>과금</TableHead>
                              <TableHead>소요시간</TableHead>
                              <TableHead>생성일</TableHead>
                              <TableHead>액션</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {analysisList.map((item) => (
                              <TableRow
                                key={item.id}
                                className="hover:bg-muted/50 cursor-pointer"
                                onClick={() => handleRowClick(item.id)}
                              >
                                <TableCell className="font-medium">#{item.id}</TableCell>
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
