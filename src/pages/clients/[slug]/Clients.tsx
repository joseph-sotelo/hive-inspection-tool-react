// UI
import ClientDetails from '@/components/clients/client-details/client-details';
import ClientsSidebar from '@/components/clients/clients-sidebar';
import { ReportGenerator } from '@/components/clients/report-generator/report-generator';

// context
import ClientsDataProvider from '@/context/clientsData/ClientsData';
import { useClientsData } from '@/context/clientsData/useClientsData';

function ClientsContent() {    
    const { showReportGenerator } = useClientsData();
    
    return (        
        <div className="flex">
            <ClientsSidebar/>      
            {showReportGenerator ? (
                    <ReportGenerator/>                                    
            ) : (                
                    <ClientDetails/>                
                )}
        </div>
    )
}

// separate export function in order to provide context
export default function Clients() {
    return (
        <ClientsDataProvider>
            <ClientsContent />
        </ClientsDataProvider>
    );
}