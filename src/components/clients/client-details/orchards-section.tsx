import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface OrchardsSectionProps {
    statuses: string[];
    hiveCounts: number[];
    orchardGrades: string[];
    onAddOrchard?: () => void;
}

export default function OrchardsSection({ 
    statuses, 
    hiveCounts, 
    orchardGrades, 
    onAddOrchard 
}: OrchardsSectionProps) {
    return (
        <div id="orchards" className="flex flex-col gap-4">
            <h4>Orchards</h4>    
            <div className="border rounded-md max-h-[350px] overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-background border-b z-10">
                        <TableRow>              
                            <TableHead>Status</TableHead>
                            <TableHead>Hive Count</TableHead>
                            <TableHead>Grade Average</TableHead>
                        </TableRow>
                    </TableHeader>            
                    <TableBody>            
                        {statuses.map((status, index) => {
                            return (
                                <TableRow key={index}>
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
            <Button 
                variant="customSecondary" 
                className="w-fit" 
                onClick={onAddOrchard}
            >
                Add Orchard
            </Button>
        </div>
    );
} 