'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'

interface ModelPricing {
  input: string
  cachedInput: string
  output: string
}

const MODEL_PRICING: Record<string, ModelPricing> = {
  'gpt-5': {
    input: '$1.25',
    cachedInput: '$0.125',
    output: '$10.00',
  },
  'gpt-5-mini': {
    input: '$0.25',
    cachedInput: '$0.025',
    output: '$2.00',
  },
  'local-model': {
    input: '$0',
    cachedInput: '$0',
    output: '$0',
  },
}

interface ModelPricingCardProps {
  modelName: string
}

export function ModelPricingCard({ modelName }: ModelPricingCardProps) {
  const pricing = MODEL_PRICING[modelName]

  if (!pricing) {
    return null
  }

  return (
    <Card className="w-64">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          <Badge variant="outline" className="text-xs">
            {modelName}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="font-medium text-muted-foreground">Input</div>
          <div className="text-right font-mono">{pricing.input}</div>
          <div className="font-medium text-muted-foreground">Cached input</div>
          <div className="text-right font-mono">{pricing.cachedInput}</div>
          <div className="font-medium text-muted-foreground">Output</div>
          <div className="text-right font-mono">{pricing.output}</div>
        </div>
      </CardContent>
    </Card>
  )
}
