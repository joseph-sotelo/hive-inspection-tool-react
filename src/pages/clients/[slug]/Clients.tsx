import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ClientsDataProvider from '@/context/clientsData/ClientsData';
import { useClientsData } from '@/context/clientsData/useClientsData';
import { getClientData } from '@/components/clients/getClientData';
import { Separator } from '@/components/ui/separator';
import ContactChip from '@/components/clients/contact-chip';
import { Pencil } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/status-badge';

function ClientDetailContent() {
    const { slug } = useParams<{ slug: string }>();
    const { setName, setStatuses, setHiveCounts, setOrchardGrades, name, statuses, hiveCounts, orchardGrades } = useClientsData();

    useEffect(() => {
        if (slug) {
            getClientData(
                slug,
                setName,
                setStatuses,
                setHiveCounts,
                setOrchardGrades
            );
        }
    }, [slug]);

    return (
        <div className="p-6 flex flex-col 2xl:flex-row">            
            <div id="info" >
                <div id="header" className="flex flex-row justify-between w-full">
                    <h1 className="text-2xl font-bold mb-4">{name || slug}</h1>
                    <Pencil />
                </div>  
                <Separator />
                <div id="contact-info">
                    <h4>Contact Information</h4>
                    <ContactChip contactType="phone" value="123-456-7890" />
                    <ContactChip contactType="email" value="custom@client.com" />
                </div>
                <Separator />
                <div id="orchards">
                    <h4>Orchards</h4>
                    <Table>
                        <TableHeader>
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
            </div>
            <div id="map" >                
            </div>
        </div>
    );
}

export default function ClientDetail() {
    return (
        <ClientsDataProvider>
            <ClientDetailContent />
        </ClientsDataProvider>
    );
}

{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-2">Statuses</h3>
    <ul>
        {statuses.map((status: string, index: number) => (
            <li key={index}>{status}</li>
        ))}
    </ul>
</div>

<div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-2">Hive Counts</h3>
    <ul>
        {hiveCounts.map((count: number, index: number) => (
            <li key={index}>{count}</li>
        ))}
    </ul>
</div>

<div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-2">Orchard Grades</h3>
    <ul>
        {orchardGrades.map((grade: string, index: number) => (
            <li key={index}>{grade}</li>
        ))}
    </ul>
</div>
</div> */}