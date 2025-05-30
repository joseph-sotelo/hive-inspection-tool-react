import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ClientsDataProvider from '@/context/clientsData/ClientsData';
import { useClientsData } from '@/context/clientsData/useClientsData';
import { getClientData } from '@/components/clients/getClientData';

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Client: {name || slug}</h1>
            
            {/* Add your conditional rendering here based on the client data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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