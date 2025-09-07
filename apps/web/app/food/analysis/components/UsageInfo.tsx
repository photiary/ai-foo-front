'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Clock, CreditCard, Zap } from 'lucide-react'
import type { UsageInfo, BillingInfo } from '@workspace/core/types'

interface UsageInfoProps {
  usage: UsageInfo
  billing: BillingInfo
}

export function UsageInfo({ usage, billing }: UsageInfoProps) {
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  const formatCost = (cost: number, currency: string) => {
    if (currency === 'USD') {
      const koreanWon = cost * 1400 // 환율 1,400원으로 계산
      return `$ ${cost.toFixed(7)} ₩ ${koreanWon.toFixed(7)}`
    }
    return `${cost.toFixed(7)} ${currency}`
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6 lg:grid-cols-4">
      {/* Token 사용량 */}
      <Card className="@container/card lg:col-span-1">
        <CardHeader>
          <CardDescription>Token 사용량</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {usage.totalTokens.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">모델</span>
              <Badge variant="outline">{usage.modelName}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">입력 토큰</span>
              <span className="font-medium">{usage.promptTokens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">출력 토큰</span>
              <span className="font-medium">{usage.completionTokens.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            AI 모델 사용량
          </div>
          <div className="text-muted-foreground">분석에 사용된 총 토큰 수</div>
        </CardFooter>
      </Card>

      {/* 과금 정보 */}
      <Card className="@container/card lg:col-span-2">
        <CardHeader>
          <CardDescription>과금 정보</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {formatCost(billing.totalCost, billing.currency)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">입력 비용</span>
              <span className="font-medium">{formatCost(billing.inputCost, billing.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">출력 비용</span>
              <span className="font-medium">{formatCost(billing.outputCost, billing.currency)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            분석 비용
          </div>
          <div className="text-muted-foreground">USD, 환율(1,400원)로 표시</div>
        </CardFooter>
      </Card>

      {/* 응답 시간 */}
      <Card className="@container/card lg:col-span-1">
        <CardHeader>
          <CardDescription>응답 시간</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {formatDuration(usage.requestDurationMs)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              AI 분석 완료까지
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            처리 시간
          </div>
          <div className="text-muted-foreground">이미지 분석부터 결과 반환까지</div>
        </CardFooter>
      </Card>
    </div>
  )
}
