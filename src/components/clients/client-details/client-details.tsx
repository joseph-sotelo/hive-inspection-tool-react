import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useClientsData } from '@/context/clientsData/useClientsData';
import { getClientData } from '@/components/clients/getClientData';
import { Separator } from '@/components/ui/separator';

// Local component imports - each section is now its own component
import ClientHeader from './client-header';
import ContactInfoSection from './contact-info-section';
import OrchardsSection from './orchards-section';
import ClientDetailsMap from './client-details-map';
import { Button } from '@/components/ui/button';

interface ClientDetailsProps {
    toggleReportGenerator?: () => void;
}

function ClientDetailContent({ toggleReportGenerator }: ClientDetailsProps) {
    const { slug } = useParams<{ slug: string }>();
    const { setName, setStatuses, setHiveCounts, setOrchardGrades, name, statuses, hiveCounts, orchardGrades, setDefinitionExpression, setFieldmapIdPrimary, fieldmapIdPrimary } = useClientsData();

    // Decode the URL-encoded slug to get the actual client name
    const clientName = slug ? decodeURIComponent(slug) : '';

    useEffect(() => {
        if (clientName) {
            getClientData(
                clientName,
                setName,
                setStatuses,
                setHiveCounts,
                setOrchardGrades,
                setDefinitionExpression,
                setFieldmapIdPrimary
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
        <div className="p-6 flex flex-col 2xl:flex-row w-full">            
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
                    fieldmapIdPrimary={fieldmapIdPrimary}
                    onAddOrchard={handleAddOrchard}
                />
                <Separator />
                <Button variant="action" size="sm" className="w-full" onClick={toggleReportGenerator}>
                    Generate Report
                </Button>
            </div>
            <div id="map" className="w-full">
                <ClientDetailsMap />
            </div>
        </div>
    );
}

export default function ClientDetails({ toggleReportGenerator }: ClientDetailsProps) {
    return (
        <ClientDetailContent toggleReportGenerator={toggleReportGenerator} />
    );
}