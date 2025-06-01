import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ClientsDataProvider from '@/context/clientsData/ClientsData';
import { useClientsData } from '@/context/clientsData/useClientsData';
import { getClientData } from '@/components/clients/getClientData';
import { Separator } from '@/components/ui/separator';

// Local component imports - each section is now its own component
import ClientHeader from './client-header';
import ContactInfoSection from './contact-info-section';
import OrchardsSection from './orchards-section';

function ClientDetailContent() {
    const { slug } = useParams<{ slug: string }>();
    const { setName, setStatuses, setHiveCounts, setOrchardGrades, name, statuses, hiveCounts, orchardGrades } = useClientsData();

    // Decode the URL-encoded slug to get the actual client name
    const clientName = slug ? decodeURIComponent(slug) : '';

    useEffect(() => {
        if (clientName) {
            getClientData(
                clientName,
                setName,
                setStatuses,
                setHiveCounts,
                setOrchardGrades
            );
        }
    }, [clientName]);

    // Handler functions for section components
    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit client clicked');
    };

    const handleAddOrchard = () => {
        // TODO: Implement add orchard functionality  
        console.log('Add orchard clicked');
    };

    return (
        <div className="p-6 flex flex-col 2xl:flex-row">            
            <div id="info" className="w-full">
                <ClientHeader 
                    name={name} 
                    slug={slug || ''} 
                    onEdit={handleEdit} 
                />
                
                <Separator />
                
                <ContactInfoSection />
                
                <Separator />
                
                <OrchardsSection 
                    statuses={statuses}
                    hiveCounts={hiveCounts}
                    orchardGrades={orchardGrades}
                    onAddOrchard={handleAddOrchard}
                />
            </div>
            <div id="map">
                {/* TODO: Add map component */}                
            </div>
        </div>
    );
}

export default function ClientDetails() {
    return (
        <ClientsDataProvider>
            <ClientDetailContent />
        </ClientsDataProvider>
    );
}