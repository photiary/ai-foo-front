'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { FoodItem } from '@workspace/core/types'

interface NutritionChartProps {
  foods: FoodItem[]
}

export function NutritionChart({ foods }: NutritionChartProps) {
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0)
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0)
  const totalFat = foods.reduce((sum, food) => sum + food.fat, 0)
  const total = totalCarbs + totalProtein + totalFat

  const data = [
    {
      name: '탄수화물',
      value: totalCarbs,
      percentage: total > 0 ? ((totalCarbs / total) * 100).toFixed(1) : 0,
      color: '#8884d8'
    },
    {
      name: '단백질',
      value: totalProtein,
      percentage: total > 0 ? ((totalProtein / total) * 100).toFixed(1) : 0,
      color: '#82ca9d'
    },
    {
      name: '지방',
      value: totalFat,
      percentage: total > 0 ? ((totalFat / total) * 100).toFixed(1) : 0,
      color: '#ffc658'
    }
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value.toFixed(1)}g ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>영양소 비율</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            영양 정보가 없습니다.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>영양소 비율</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">탄수화물, 단백질, 지방의 비율을 파이차트로 표시</span>
          <span className="@[540px]/card:hidden">영양소 비율 차트</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* 영양소 요약 */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                {item.value.toFixed(1)}g ({item.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
