import { Button } from "../ui/button";
import ClientsListRenderer from "./clients-list-renderer";


export default function ClientsSidebar() {
    return (       
        <div className="border-r-1 border-border flex flex-col gap-6 px-6 py-6">
            <div>
                <h1>Clients</h1>
            </div>
            <div> 
                <ClientsListRenderer />                
            </div>
            <Button variant="customSecondary">New Client</Button>
        </div>
    )
}