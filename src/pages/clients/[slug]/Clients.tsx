import ClientDetails from '@/components/clients/client-details/client-details';
import ClientsSidebar from '@/components/clients/clients-sidebar';

export default function Clients() {
    console.log('Clients page rendering'); // Debug log
    
    return (        
            <div className="flex">
                <ClientsSidebar />                    
                <ClientDetails />                                        
            </div>
    )
}