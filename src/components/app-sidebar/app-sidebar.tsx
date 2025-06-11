// for navigation
// TODO: make it disappear on mobile

// UI
import { Map, User, Users } from "lucide-react"
import { 
  Sidebar, 
  SidebarContent,    
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem    
} from "@/components/ui/sidebar"

// routing
import { Link } from "react-router-dom"

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
      icon: User,
    }
  ]

  export function AppSidebar() {
    return (
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r border-border h-screen shadow-lg z-50 bg-background sticky top-0 left-0"
      >
        <SidebarContent>                    
            <SidebarGroup>                
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url || '/'}>
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