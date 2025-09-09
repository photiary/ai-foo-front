'use client'

import React from 'react'
import type { FoodAnalysisResponse } from '@workspace/core/types'
import { Badge } from '@workspace/ui/components/badge'
import { FoodImageDisplay } from './FoodImageDisplay'
import { FoodList } from './FoodList'
import { AISuggestions } from './AISuggestions'
import { NutritionChart } from './NutritionChart'
import { UsageInfo } from './UsageInfo'

interface FoodAnalysisResultProps {
  analysisResult: FoodAnalysisResponse
  imageUrl: string
}

export function FoodAnalysisResult({ analysisResult, imageUrl }: FoodAnalysisResultProps) {
  const isImgOnlyMode = analysisResult.analysisMode === 'IMG_ONLY'

  return (
    <>
      {/* 음식 이미지와 라벨 표시 */}
      <div className="px-4 lg:px-6">
        <FoodImageDisplay imageUrl={imageUrl} foods={analysisResult.foods} imageSize={analysisResult.imageSize} />
      </div>

      {/* 음식 목록 */}
      <FoodList foods={analysisResult.foods} />

      {/* IMG_ONLY 모드가 아닌 경우에만 AI 제안과 영양 정보 표시 */}
      {!isImgOnlyMode && (
        <div className="px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* 식사의 적합성 - 25% */}
          <div className="lg:col-span-1">
            <div className="h-full">
              <div className="from-primary/5 to-card dark:bg-card shadow-xs h-full rounded-lg border bg-gradient-to-t p-6">
                <div className="space-y-3">
                  <div className="text-muted-foreground text-sm">식사의 적합성</div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    AI 평가
                  </div>
                  <div className="space-y-3">
                    <div
                      className={`w-full justify-center rounded-md border px-3 py-2 text-center text-sm font-medium ${
                        analysisResult.suitability?.toLowerCase().includes('좋음') ||
                        analysisResult.suitability?.toLowerCase().includes('적합') ||
                        analysisResult.suitability?.toLowerCase().includes('건강')
                          ? 'border-green-200 bg-green-100 text-green-800'
                          : analysisResult.suitability?.toLowerCase().includes('보통') ||
                              analysisResult.suitability?.toLowerCase().includes('평균')
                            ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                            : 'border-red-200 bg-red-100 text-red-800'
                      }`}
                    >
                      {analysisResult.suitability}
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">AI가 분석한 식사의 건강성</div>
                    <div className="text-muted-foreground">영양 균형과 건강 상태를 고려한 평가</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI 식사 제안 - 50% */}
          <div className="lg:col-span-2">
            <div className="h-full">
              <div className="from-primary/5 to-card dark:bg-card shadow-xs h-full rounded-lg border bg-gradient-to-t p-6">
                <div className="space-y-3">
                  <div className="text-muted-foreground text-sm">AI 식사 제안</div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    개인화된 조언
                  </div>
                  {/* 사용자 상태 Badge 표시 */}
                  {analysisResult.userStatus && (
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.userStatus.split(',').map((status, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="bg-blue-100 text-xs text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                        >
                          {status.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">{analysisResult.suggestion}</p>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">맞춤형 식사 개선 방안</div>
                    <div className="text-muted-foreground">사용자 상태를 고려한 AI 제안</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 영양소 비율 - 25% */}
          <div className="lg:col-span-1">
            <NutritionChart foods={analysisResult.foods} />
          </div>
        </div>
      </div>
      )}

      {/* 사용량 및 과금 정보 - 모든 모드에서 표시 */}
      <UsageInfo usage={analysisResult.usage} billing={analysisResult.billing} />
    </>
  )
}
