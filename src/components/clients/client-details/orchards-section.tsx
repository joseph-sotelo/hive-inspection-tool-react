// context
import { useClientsData } from "@/context/clientsData/useClientsData";

// UI
import ClientDetailsMap from './client-details-map';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/status-badge';

interface OrchardsSectionProps {
    statuses: string[];
    hiveCounts: number[];
    orchardGrades: string[];
    fieldmapIdPrimary: string[];
    onAddOrchard?: () => void;
}

export default function OrchardsSection({ 
    statuses, 
    hiveCounts, 
    orchardGrades, 
    fieldmapIdPrimary,    
}: OrchardsSectionProps) {

    const { setDefinitionExpression } = useClientsData();

    return (
        <div id="orchards" className="flex flex-col gap-6">
            <h4>Orchards</h4>  
            <div className="flex flex-col gap-6 h-[550px] xl:h-[350px]">                
                <div className="border border-border rounded-md overflow-y-auto w-full h-1/2 xl:h-full xl:w-1/2">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background border-b z-10">
                            <TableRow>              
                                <TableHead>Fieldmap ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Hive Count</TableHead>
                                <TableHead>Grade Average</TableHead>
                            </TableRow>
                        </TableHeader>            
                        <TableBody>            
                            {statuses.map((status, index) => {
                                return (
                                    <TableRow key={index} 
                                        onClick={() => setDefinitionExpression(`fieldmap_id_primary='${fieldmapIdPrimary[index]}'`)}>
                                        <TableCell>
                                            {fieldmapIdPrimary[index]}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={status} />
                                        </TableCell>
                                        <TableCell>{hiveCounts[index]}</TableCell>
                                        <TableCell>{orchardGrades[index]}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>                                    
                <div className="w-full xl:w-1/2 h-1/2 xl:h-full">
                    <ClientDetailsMap />    
                </div>                
            </div>                                     
        </div>
    );
} 