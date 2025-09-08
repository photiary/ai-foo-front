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
  ].filter(item => item.value > 0) // 0인 값들은 제외

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

  if (total === 0 || data.length === 0) {
    return (
      <div className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs rounded-lg border p-6 h-full">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">영양소 비율</div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            영양 균형
          </div>
          <div className="h-48 w-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              영양 정보가 없습니다.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs rounded-lg border p-6 h-full">
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">영양소 비율</div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          영양 균형
        </div>
        <div className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={80}
                paddingAngle={1}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* 영양소 요약 */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-muted-foreground">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          탄수화물, 단백질, 지방의 비율
        </div>
      </div>
    </div>
  )
}
