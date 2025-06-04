import ClientDetails from '@/components/clients/client-details/client-details';
import ClientsSidebar from '@/components/clients/clients-sidebar';
import { ReportGenerator } from '@/components/clients/report-generator/report-generator';
import { useState } from 'react';
import ClientsDataProvider from '@/context/clientsData/ClientsData';

export default function Clients() {
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    
    const toggleReportGenerator = () => {
        setShowReportGenerator(!showReportGenerator);
    };
    
    return (        
        <div className="flex">
            <ClientsSidebar/>      
            <ClientsDataProvider>
            {showReportGenerator ? (
                <>                    
                    <ReportGenerator onBack={toggleReportGenerator} />                    
                </>
            ) : (                
                    <ClientDetails toggleReportGenerator={toggleReportGenerator} />                
                )}
            </ClientsDataProvider>
        </div>
    )
}