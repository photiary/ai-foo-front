'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import type { FoodItem } from '@workspace/core/types'
import { useState, useEffect } from 'react'

interface FoodImageDisplayProps {
  imageUrl: string | null
  foods: FoodItem[]
  imageSize?: string
}

export function FoodImageDisplay({ imageUrl, foods, imageSize }: FoodImageDisplayProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [displayDimensions, setDisplayDimensions] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    if (!imageUrl) return
    
    const img = new Image()
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
      
      // 표시된 이미지의 실제 크기 계산
      const imgElement = img
      const maxWidth = 1024 // 최대 1024px로 제한
      const maxHeight = 1024 // 최대 1024px로 제한
      const aspectRatio = img.naturalWidth / img.naturalHeight
      
      let displayWidth = img.naturalWidth
      let displayHeight = img.naturalHeight
      
      // 가로와 세로 모두 1024px를 초과하지 않도록 조정
      if (displayWidth > maxWidth) {
        displayWidth = maxWidth
        displayHeight = maxWidth / aspectRatio
      }
      
      if (displayHeight > maxHeight) {
        displayHeight = maxHeight
        displayWidth = maxHeight * aspectRatio
      }
      
      setDisplayDimensions({ width: displayWidth, height: displayHeight })
    }
    img.src = imageUrl
  }, [imageUrl])

  // 이미지 크기 비율 계산
  const getScaleRatio = () => {
    if (!imageDimensions || !displayDimensions) return { scaleX: 1, scaleY: 1 }
    
    return {
      scaleX: displayDimensions.width / imageDimensions.width,
      scaleY: displayDimensions.height / imageDimensions.height
    }
  }

  const { scaleX, scaleY } = getScaleRatio()

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>분석된 음식 이미지</CardTitle>
        <CardDescription>
          AI가 인식한 음식들의 위치가 표시됩니다
          {imageSize && (
            <span className="ml-2 text-sm text-muted-foreground">
              (원본 크기: {imageSize})
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <div className="relative inline-block">
            <img
              src={imageUrl}
              alt="분석된 음식 이미지"
              className="max-w-full h-auto rounded-lg shadow-md"
              style={{ maxWidth: '1024px', maxHeight: '1024px' }}
            />
            {/* 음식 라벨 오버레이 */}
            {foods.map((food, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${food.position.x * scaleX}px`,
                  top: `${food.position.y * scaleY}px`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <Badge
                  variant="default"
                  className="bg-primary/90 text-primary-foreground shadow-lg"
                >
                  {food.name}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
            <p className="text-muted-foreground">이미지를 불러올 수 없습니다.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
