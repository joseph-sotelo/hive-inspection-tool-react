// page displaying data for selected client

// hooks
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getClientData } from '@/components/clients/getClientData';

// ui
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// context
import { useClientsData } from '@/context/clientsData/useClientsData';

// page sections
import HeaderSection from './header-section';
import ContactInfoSection from './contact-info-section';
import OrchardsSection from './orchards-section';

function ClientDetailContent() {
    // get the client's name from the url
    const { slug } = useParams<{ slug: string }>();
    
    // client data will be stored in context:
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

    // media query used to disable client reports for mobile
    const isDesktop = useMediaQuery('(min-width: 1212px)');

    // decode the url to get the client's name
    const clientName = slug ? decodeURIComponent(slug) : '';

    // set the client's data in context based on the client's name form the url
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

    // Placeholder handler functions for section components
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
                <HeaderSection 
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