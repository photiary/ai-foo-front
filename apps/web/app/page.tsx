import React from 'react'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { AppSidebar } from '@/components/template/app-sidebar'
import { SiteHeader } from '@/components/template/site-header'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import Link from 'next/link'

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex min-h-[60vh] items-center justify-center">
                  <Card className="@container/card w-full max-w-2xl">
                    <CardHeader className="text-center">
                      <CardTitle className="text-4xl font-bold">AI 음식 분석</CardTitle>
                      <CardDescription className="text-lg">
                        음식 사진을 업로드하고 AI가 영양 정보를 분석해드립니다
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex justify-center gap-4">
                        <Link href="/food/analysis">
                          <Button size="lg" className="px-8">
                            음식 분석 시작하기
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
