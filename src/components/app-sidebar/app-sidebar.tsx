import { Map, User, Users } from "lucide-react"
import { Link } from "react-router-dom"
import ClientsSidebar from "../clients/clients-sidebar"

import { 
    Sidebar, 
    SidebarContent,    
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem    
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
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarContent>                    
            <SidebarGroup>                
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span className="sr-only">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }