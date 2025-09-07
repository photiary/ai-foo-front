'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Lightbulb, CheckCircle } from 'lucide-react'

interface AISuggestionsProps {
  suitability: string
  suggestion: string
}

export function AISuggestions({ suitability, suggestion }: AISuggestionsProps) {
  const getSuitabilityColor = (suitability: string) => {
    const lowerSuitability = suitability.toLowerCase()
    if (lowerSuitability.includes('좋') || lowerSuitability.includes('적합') || lowerSuitability.includes('건강')) {
      return 'bg-green-100 text-green-800 border-green-200'
    } else if (lowerSuitability.includes('보통') || lowerSuitability.includes('평균')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    } else {
      return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6">
      {/* 식사의 적합성 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>식사의 적합성</CardDescription>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            AI 평가
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Badge 
              variant="outline" 
              className={`w-full justify-center py-2 ${getSuitabilityColor(suitability)}`}
            >
              {suitability}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            AI가 분석한 식사의 건강성
          </div>
          <div className="text-muted-foreground">영양 균형과 건강 상태를 고려한 평가</div>
        </CardFooter>
      </Card>

      {/* AI 식사 제안 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>AI 식사 제안</CardDescription>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            개인화된 조언
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {suggestion}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            맞춤형 식사 개선 방안
          </div>
          <div className="text-muted-foreground">사용자 상태를 고려한 AI 제안</div>
        </CardFooter>
      </Card>
    </div>
  )
}
