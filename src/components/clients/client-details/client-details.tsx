import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getClientData } from '@/components/clients/getClientData';
import { Separator } from '@/components/ui/separator';

// context
import { useClientsData } from '@/context/clientsData/useClientsData';

// Local component imports - each section is now its own component
import ClientHeader from './client-header';
import ContactInfoSection from './contact-info-section';
import OrchardsSection from './orchards-section';
import { Button } from '@/components/ui/button';

function ClientDetailContent() {
    const { slug } = useParams<{ slug: string }>();
    const { 
        setName, 
        setStatuses, 
        setHiveCounts, 
        setOrchardGrades, 
        name, 
        statuses, 
        hiveCounts, 
        orchardGrades, 
        setDefinitionExpression, 
        setFieldmapIdPrimary, 
        fieldmapIdPrimary,         
        setShowReportGenerator,
        showReportGenerator,
    } = useClientsData();


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
                setFieldmapIdPrimary,
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
        <div className="p-6 flex flex-col gap-12 2xl:flex-row w-7/10">            
            <div id="info" className="w-full flex flex-col gap-6">
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
                <div className="flex flex-row gap-4">
                    <Button 
                        variant="customSecondary" 
                        className="w-fit"                 
                    >
                        Add Orchard
                    </Button>        
                    <Button variant="action" onClick={() => setShowReportGenerator(true)}>
                        Generate Report
                    </Button>
                </div>                
            </div>
        </div>
    );
}

export default function ClientDetails() {
    return (
        <ClientDetailContent/>
    );
}