// Persistent sidebar for navigating from client to client.
import { Button } from "@/components/ui/button";
import ClientsListRenderer from "./clients-list-renderer";
import { Separator } from "@/components/ui/separator";


export default function ClientsSidebar() {
    return (       
        <div className="border-r-1 border-border flex flex-col gap-6 py-6 sticky top-0 left-0 h-screen overflow-y-scroll">
            <div className="pl-6">
                <big>Clients</big>
            </div>
            <div> 
                <ClientsListRenderer />   
                <Separator />
            </div>
            <Button variant="customSecondary" className="mx-6">New Client</Button>
        </div>
    )
}