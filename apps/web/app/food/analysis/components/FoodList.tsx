'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import type { FoodItem } from '@workspace/core/types'

interface FoodListProps {
  foods: FoodItem[]
}

export function FoodList({ foods }: FoodListProps) {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0)
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0)
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0)
  const totalFat = foods.reduce((sum, food) => sum + food.fat, 0)

  return (
    <div className="px-4 lg:px-6 space-y-6">
      {/* 요약 카드들 */}
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t">
        {/* 총 칼로리 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>총 칼로리</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalCalories.toFixed(0)}kcal
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 총 탄수화물 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>총 탄수화물</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalCarbs.toFixed(1)}g
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 총 단백질 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>총 단백질</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalProtein.toFixed(1)}g
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 총 지방 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>총 지방</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalFat.toFixed(1)}g
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* 음식 목록 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>음식 목록</CardTitle>
          <CardDescription>분석된 음식들의 상세 영양 정보</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[200px]">음식명</TableHead>
                  <TableHead className="text-right">칼로리 (kcal)</TableHead>
                  <TableHead className="text-right">탄수화물 (g)</TableHead>
                  <TableHead className="text-right">단백질 (g)</TableHead>
                  <TableHead className="text-right">지방 (g)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foods.map((food, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{food.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="font-mono">
                        {food.calories.toFixed(0)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">
                        {food.carbs.toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">
                        {food.protein.toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">
                        {food.fat.toFixed(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {/* 총계 행 */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell className="font-bold">총계</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="font-mono">
                      {totalCalories.toFixed(0)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="font-mono">
                      {totalCarbs.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="font-mono">
                      {totalProtein.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="font-mono">
                      {totalFat.toFixed(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
