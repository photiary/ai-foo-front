'use client'

import { usePathname } from 'next/navigation'
import { IconCirclePlusFilled, IconMail, type Icon } from '@tabler/icons-react'

import { Button } from '@workspace/ui/components/button.tsx'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar.tsx'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  // 현재 경로가 메뉴 항목과 일치하는지 확인하는 함수
  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === '/'
    }
    // 정확한 경로 매칭을 위해 더 정확한 로직 사용
    if (pathname === url) {
      return true
    }
    // 하위 경로가 있는 경우에만 startsWith 사용 (예: /food/analysis/[id])
    // 하지만 /food/analysis/list는 /food/analysis와 정확히 구분되어야 함
    if (url === '/food/analysis' && pathname.startsWith('/food/analysis/') && pathname !== '/food/analysis/list') {
      return true
    }
    return false
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title} 
                isActive={isActive(item.url)}
                className={isActive(item.url) ? "data-[active=true]:bg-sidebar-accent" : ""}
              >
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
