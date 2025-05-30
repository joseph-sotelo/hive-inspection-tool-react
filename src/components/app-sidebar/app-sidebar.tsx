import { Map, User, Users } from "lucide-react"
import { Link } from "react-router-dom"
import ClientsSidebar from "../clients/clients-sidebar"

import { 
    Sidebar, 
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
      title: "Map",
      url: "/map",
      icon: Map,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Account",
      url: "/account",
      icon: User,
    }
  ]

  export function AppSidebar() {
    return (
      <Sidebar collapsible="icon" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row w-[440px]">
        <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
            <SidebarContent>
            <SidebarGroup>                
                <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                        <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
            <ClientsSidebar />
        </Sidebar>
      </Sidebar>
    )
  }