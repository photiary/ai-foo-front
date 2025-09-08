'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card'
import { Button } from '@workspace/ui/components/button'
import { AppSidebar } from '@/components/template/app-sidebar'
import { SiteHeader } from '@/components/template/site-header'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { fetchFoodAnalysisDetail } from '../../foodAPI'
import { FoodAnalysisResult } from '../components/FoodAnalysisResult'
import { LoadingComponent } from '../components/LoadingComponent'
import type { FoodAnalysisResponse } from '@workspace/core/types'

export default function FoodAnalysisDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const loadAnalysisDetail = async () => {
      try {
        setIsLoading(true)
        const id = Number(params.id)
        if (isNaN(id)) {
          setError('유효하지 않은 분석 ID입니다.')
          return
        }

        const data = await fetchFoodAnalysisDetail(id)
        setAnalysisResult(data)
        
        // 이미지 파일명이 있는 경우 이미지 URL 설정
        if (data.imageFileName) {
          // API URL을 직접 사용
          const imageApiUrl = `/v1/food/analysis/image?fileName=${encodeURIComponent(data.imageFileName)}`
          setImageUrl(imageApiUrl)
        }
      } catch (err) {
        setError('분석 상세 정보를 불러오는 중 오류가 발생했습니다.')
        console.error('Detail loading error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalysisDetail()
  }, [params.id])

  const handleBackToList = () => {
    router.push('/food/analysis/list')
  }

  const handleNewAnalysis = () => {
    router.push('/food/analysis')
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
                  <LoadingComponent open={true} />
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBackToList}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      목록으로
                    </Button>
                    <div>
                      <h1 className="text-3xl font-bold mb-2">식사 이미지 분석 상세</h1>
                      <p className="text-muted-foreground">분석 ID: #{params.id}</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleNewAnalysis}
                    className="px-6"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    새 분석하기
                  </Button>
                </div>
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

              {/* 분석 결과 섹션들 */}
              {analysisResult && !isLoading && (
                <FoodAnalysisResult
                  analysisResult={analysisResult}
                  imageUrl={imageUrl}
                />
              )}

              {/* 분석 결과가 없는 경우 */}
              {!analysisResult && !isLoading && !error && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">분석 결과를 찾을 수 없습니다.</p>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleBackToList} variant="outline">
                            목록으로 돌아가기
                          </Button>
                          <Button onClick={handleNewAnalysis}>
                            새 분석 시작하기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
