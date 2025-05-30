import { Button } from "../ui/button";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "../ui/sidebar";
import ClientsListRenderer from "./clients-list-renderer";


export default function ClientsSidebar() {
    return (        
        <>
            <SidebarHeader>
                <h1>Clients</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Clients</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <ClientsListRenderer />
                        <Button variant="customSecondary">New Client</Button>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    )
}