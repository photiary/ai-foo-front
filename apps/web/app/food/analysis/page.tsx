'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@workspace/ui/components/hover-card'
import { AppSidebar } from '@/components/template/app-sidebar'
import { SiteHeader } from '@/components/template/site-header'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { Play, RotateCcw, Utensils, ClipboardPlus } from 'lucide-react'
import { postFoodAnalysis } from '../foodAPI'
import type { FoodAnalysisResponse } from '@workspace/core/types'
import { FoodAnalysisResult } from './components/FoodAnalysisResult'
import { LoadingComponent } from '@/app/food/analysis/components/LoadingComponent'
import { TagInput } from './components/TagInput'
import { ModelPricingCard } from './components/ModelPricingCard'

type AnalysisMode = 'IMG_ONLY' | 'IMG_SUGG'

const MODEL_OPTIONS = [
  { value: 'local-model', label: 'Local Model' },
  { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
  { value: 'gpt-5', label: 'GPT-5' },
]

export default function FoodAnalysisPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [userStatus, setUserStatus] = useState<string[]>([])
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('IMG_ONLY')
  const [selectedModel, setSelectedModel] = useState<string>('local-model')
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 이미지 리사이즈
      resizeImage(file, 1980).then((resizedFile) => {
        setImage(resizedFile)
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
        }
        reader.readAsDataURL(resizedFile)
      })
    }
  }

  const handleAnalyze = async () => {
    if (!image) {
      setError('이미지를 입력해주세요.')
      return
    }

    if (analysisMode === 'IMG_SUGG' && userStatus.length === 0) {
      setError('사용자 상태를 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await postFoodAnalysis(image, userStatus.join(','), analysisMode, selectedModel)
      setAnalysisResult(result)
    } catch (err) {
      setError('분석 중 오류가 발생했습니다.')
      console.error('Analysis error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setImagePreview(null)
    setUserStatus([])
    setAnalysisMode('IMG_ONLY')
    setSelectedModel('local-model')
    setAnalysisResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
                <h1 className="mb-2 text-3xl font-bold">식사 이미지 분석</h1>
                <p className="text-muted-foreground">음식 사진을 업로드하고 영양 정보를 분석해보세요</p>
              </div>

              {/* 분석 모드 선택 섹션 */}
              <div className="px-4 lg:px-6">
                <Card className="@container/card">
                  <CardHeader>
                    <CardTitle>분석 모드</CardTitle>
                    <CardDescription>원하는 분석 방식을 선택하세요</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Button
                        variant={analysisMode === 'IMG_ONLY' ? 'default' : 'outline'}
                        onClick={() => setAnalysisMode('IMG_ONLY')}
                        className="flex-1"
                      >
                        <Utensils className="mr-2 h-4 w-4" />
                        식사 이미지 분석만
                      </Button>
                      <Button
                        variant={analysisMode === 'IMG_SUGG' ? 'default' : 'outline'}
                        onClick={() => setAnalysisMode('IMG_SUGG')}
                        className="flex-1"
                      >
                        <ClipboardPlus className="mr-2 h-4 w-4" />
                        식사 이미지 분석 + AI 식사 제안
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 모델 선택 섹션 */}
              <div className="px-4 lg:px-6">
                <Card className="@container/card">
                  <CardHeader>
                    <CardTitle>AI 모델 선택</CardTitle>
                    <CardDescription>분석에 사용할 AI 모델을 선택하세요</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedModel} onValueChange={setSelectedModel} className="flex flex-wrap gap-6">
                      {MODEL_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center gap-3">
                          <RadioGroupItem value={option.value} id={option.value}/>
                          <Label htmlFor={option.value} className="cursor-pointer">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Badge variant="outline" className="hover:bg-accent">
                                  {option.label}
                                </Badge>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <ModelPricingCard modelName={option.value} />
                              </HoverCardContent>
                            </HoverCard>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* 사용자 상태 입력 섹션 - IMG_SUGG 모드에서만 표시 */}
              {analysisMode === 'IMG_SUGG' && (
                <div className="px-4 lg:px-6">
                  <Card className="@container/card">
                    <CardHeader>
                      <CardTitle>사용자 상태</CardTitle>
                      <CardDescription>현재 상태를 입력하여 더 정확한 분석을 받으세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TagInput
                        tags={userStatus}
                        onTagsChange={setUserStatus}
                        placeholder="상태를 입력하고 쉼표로 구분하세요 (예: 다이어트, 운동중)"
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* 이미지 업로드 섹션 */}
              <div className="px-4 lg:px-6">
                <Card className="@container/card">
                  <CardHeader>
                    <CardTitle>이미지 업로드</CardTitle>
                    <CardDescription>음식 사진을 선택하여 분석을 시작하세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="image-upload" className="mb-3 block">
                        음식 이미지 선택
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                      />
                    </div>

                    {imagePreview && !analysisResult && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="업로드된 이미지"
                          className="mx-auto max-w-md rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* 분석 버튼 섹션 */}
              <div className="px-4 lg:px-6">
                <div className="flex justify-center gap-6">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!image || (analysisMode === 'IMG_SUGG' && userStatus.length === 0) || isLoading}
                    size="lg"
                    className="px-8 py-3"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {isLoading ? '분석 중...' : '분석 시작'}
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg" className="px-8 py-3">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    초기화
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

              {/* 로딩 컴포넌트 */}
              <LoadingComponent open={isLoading} />

              {/* 분석 결과 섹션들 */}
              {analysisResult && !isLoading && (
                <FoodAnalysisResult analysisResult={analysisResult} imageUrl={imagePreview!} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// 이미지 리사이즈 함수
async function resizeImage(file: File, maxSize: number): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new window.Image()

    img.onload = () => {
      const { width, height } = img
      const maxDimension = Math.max(width, height)

      if (maxDimension <= maxSize) {
        resolve(file)
        return
      }

      const scale = maxSize / maxDimension
      const newWidth = Math.round(width * scale)
      const newHeight = Math.round(height * scale)

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          } else {
            resolve(file)
          }
        },
        file.type,
        0.9
      )
    }

    img.src = URL.createObjectURL(file)
  })
}
