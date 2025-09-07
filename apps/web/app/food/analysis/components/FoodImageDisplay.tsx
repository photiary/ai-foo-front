'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import type { FoodItem } from '@workspace/core/types'

interface FoodImageDisplayProps {
  imageUrl: string
  foods: FoodItem[]
}

export function FoodImageDisplay({ imageUrl, foods }: FoodImageDisplayProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>분석된 음식 이미지</CardTitle>
        <CardDescription>AI가 인식한 음식들의 위치가 표시됩니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt="분석된 음식 이미지"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
          {/* 음식 라벨 오버레이 */}
          {foods.map((food, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${food.position.x}px`,
                top: `${food.position.y}px`,
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
      </CardContent>
    </Card>
  )
}
