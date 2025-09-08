'use client'

import React from 'react'
import type { FoodAnalysisResponse } from '@workspace/core/types'
import { FoodImageDisplay } from './FoodImageDisplay'
import { FoodList } from './FoodList'
import { AISuggestions } from './AISuggestions'
import { NutritionChart } from './NutritionChart'
import { UsageInfo } from './UsageInfo'

interface FoodAnalysisResultProps {
  analysisResult: FoodAnalysisResponse
  imageUrl?: string
}

export function FoodAnalysisResult({ analysisResult, imageUrl }: FoodAnalysisResultProps) {
  return (
    <>
      {/* 음식 이미지와 라벨 표시 */}
      {imageUrl && (
        <div className="px-4 lg:px-6">
          <FoodImageDisplay
            imageUrl={imageUrl}
            foods={analysisResult.foods}
            imageSize={analysisResult.imageSize}
          />
        </div>
      )}

      {/* 음식 목록 */}
      <FoodList foods={analysisResult.foods} />

      {/* AI 제안 */}
      <AISuggestions
        suitability={analysisResult.suitability}
        suggestion={analysisResult.suggestion}
      />

      {/* 영양 정보 차트 */}
      <div className="px-4 lg:px-6">
        <NutritionChart foods={analysisResult.foods} />
      </div>

      {/* 사용량 및 과금 정보 */}
      <UsageInfo
        usage={analysisResult.usage}
        billing={analysisResult.billing}
      />
    </>
  )
}
