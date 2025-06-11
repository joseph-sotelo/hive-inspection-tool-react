// Displays information pertaining to the selected client. It's the main focus of the clients page.

// hooks
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getClientData } from '@/components/clients/getClientData';

// context
import { useClientsData } from '@/context/clientsData/useClientsData';

// UI
import { Separator } from '@/components/ui/separator';
import ClientHeader from './client-header';
import ContactInfoSection from './contact-info-section';
import OrchardsSection from './orchards-section';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ClientDetailContent() {

    // used to get the client's name from the url. Then, client name is used as the 'where' clause for the query to get the client's orchards.
    const { slug } = useParams<{ slug: string }>();
    // Decode the URL-encoded slug to get the actual client name
    const clientName = slug ? decodeURIComponent(slug) : '';

    // hooks to update context
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
        setShowReportGenerator        
    } = useClientsData();

    // used to disable button on mobile - can't be done with tailwind
    const isDesktop = useMediaQuery('(min-width: 1212px)');

    // updates client context
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

    // placeholder for editing client details
    const handleEdit = () => {

    };

    // placeholder for adding new orchards
    const handleAddOrchard = () => {
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
                    <Button 
                        variant="action" 
                        disabled={!isDesktop} 
                        onClick={() => setShowReportGenerator(true)}
                    >
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