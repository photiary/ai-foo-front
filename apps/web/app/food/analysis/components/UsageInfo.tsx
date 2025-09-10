'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Clock, CreditCard, Zap, HelpCircle } from 'lucide-react'
import type { UsageInfo, BillingInfo } from '@workspace/core/types'
import { formatCost, formatDuration } from '@/lib/formatUtils'

interface UsageInfoProps {
  usage: UsageInfo
  billing: BillingInfo
}

export function UsageInfo({ usage, billing }: UsageInfoProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:grid-cols-4 lg:px-6">
      {/* Token 사용량 */}
      <Card className="@container/card lg:col-span-1">
        <CardHeader>
          <CardDescription>
            <div className="flex justify-between">
              <span>Token 사용량</span>
              <Badge variant="outline">{usage.modelName}</Badge>
            </div>
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl flex items-center gap-2 text-2xl font-semibold tabular-nums">
            <Zap className="h-5 w-5" />
            {usage.totalTokens?.toLocaleString() ?? '0'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">입력 토큰</span>
              <span className="font-medium">{usage.promptTokens?.toLocaleString() ?? '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">입력 토큰 (Cached)</span>
              <span className="font-medium">{usage.cachedTokens?.toLocaleString() ?? '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">출력 토큰</span>
              <span className="font-medium">{usage.completionTokens?.toLocaleString() ?? '0'}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">AI 모델 사용량</div>
          <div className="text-muted-foreground">분석에 사용된 총 토큰 수</div>
        </CardFooter>
      </Card>

      {/* 과금 정보 */}
      <Card className="@container/card lg:col-span-2">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            과금 정보
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={() => window.open('https://platform.openai.com/docs/pricing', '_blank')}
            >
              <HelpCircle className="h-3 w-3" />
            </Button>
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl flex items-center gap-2 text-2xl font-semibold tabular-nums">
            <CreditCard className="h-5 w-5" />
            {formatCost(billing.totalCost, billing.currency)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">입력 비용</span>
              <span className="font-medium">{formatCost(billing.inputCost, billing.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">입력 비용 (Cached)</span>
              <span className="font-medium">{formatCost(billing.cachedInputCost, billing.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">출력 비용</span>
              <span className="font-medium">{formatCost(billing.outputCost, billing.currency)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">분석 비용</div>
          <div className="text-muted-foreground">USD (KRW ₩1,400 환율)</div>
        </CardFooter>
      </Card>

      {/* 응답 시간 */}
      <Card className="@container/card lg:col-span-1">
        <CardHeader>
          <CardDescription>응답 시간</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl flex items-center gap-2 text-2xl font-semibold tabular-nums">
            <Clock className="h-5 w-5" />
            {formatDuration(usage.requestDurationMs)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">처리 시간</div>
          <div className="text-muted-foreground">이미지 분석부터 결과 반환까지</div>
        </CardFooter>
      </Card>
    </div>
  )
}
