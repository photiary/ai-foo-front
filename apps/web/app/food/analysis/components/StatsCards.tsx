'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Zap, CreditCard, Clock } from 'lucide-react'
import { formatCost, formatDuration } from '@/lib/formatUtils'

interface StatsCardsProps {
  data: Array<{
    totalTokens?: number
    totalCost?: number
    requestDurationMs?: number
  }>
}

export function StatsCards({ data }: StatsCardsProps) {
  // 통계 계산
  const tokenStats = calculateStats(data.map((item) => item.totalTokens).filter(Boolean) as number[])
  const costStats = calculateStats(data.map((item) => item.totalCost).filter(Boolean) as number[])
  const durationStats = calculateStats(data.map((item) => item.requestDurationMs).filter(Boolean) as number[])

  return (
    <div className="flex flex-row gap-4">
      {/* Token 사용량 카드 */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Token 사용량</CardTitle>
          <Zap className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">최소</span>
              <Badge variant="outline">{tokenStats.min.toLocaleString()}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">최대</span>
              <Badge variant="outline">{tokenStats.max.toLocaleString()}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">평균</span>
              <Badge variant="default">{Math.round(tokenStats.avg).toLocaleString()}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 과금 카드 */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>과금 정보</CardTitle>
          <CreditCard className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">최소</span>
              <Badge variant="outline">{formatCost(costStats.min)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">최대</span>
              <Badge variant="outline">{formatCost(costStats.max)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">평균</span>
              <Badge variant="default">{formatCost(costStats.avg)}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 응답 시간 카드 */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>응답 시간</CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">최소</span>
              <Badge variant="outline">{formatDuration(durationStats.min)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">최대</span>
              <Badge variant="outline">{formatDuration(durationStats.max)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">평균</span>
              <Badge variant="default">{formatDuration(durationStats.avg)}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 통계 계산 함수
function calculateStats(values: number[]): { min: number; max: number; avg: number } {
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0 }
  }

  const min = Math.min(...values)
  const max = Math.max(...values)
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length

  return { min, max, avg }
}
