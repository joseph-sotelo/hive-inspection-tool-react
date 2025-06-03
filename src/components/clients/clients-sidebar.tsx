import { Button } from "../ui/button";
import ClientsListRenderer from "./clients-list-renderer";


export default function ClientsSidebar() {
    return (       
        <div className="">
            <div>
                <h1>Clients</h1>
            </div>
            <div> 
                <ClientsListRenderer />
                <Button variant="customSecondary">New Client</Button>
            </div>
        </div>
    )
}