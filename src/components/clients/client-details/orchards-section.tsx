// displays a table of all the client's orchards and a map displaying selected orchards. The map defaults to showing all orchards.

// context
import { useClientsData } from "@/context/clientsData/useClientsData";

// UI
import MapSection from './map-section';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/status-badge';

type OrchardsSectionProps = {
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

    // the map's definition expression comes from context
    const { setDefinitionExpression } = useClientsData();

    return (
        <div id="orchards" className="flex flex-col gap-6">
            <h4>Orchards</h4>  
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 h-[550px]">                
                <div className="border border-border rounded-md overflow-y-auto w-full h-[250px] xl:h-full xl:col-span-1 table-container">
                    <Table>
                        <TableHeader className="bg-background border-b z-10">
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
                <div className="w-full h-[250px] xl:h-full xl:col-span-1">
                    <MapSection />    
                </div>                
            </div>                                     
        </div>
    );
} 