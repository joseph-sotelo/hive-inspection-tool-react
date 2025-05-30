import ClientsListRenderer from '@/components/clients/clients-list-renderer';
import ClientsDataProvider from '@/context/clientsData/ClientsData';

export default function Clients() {
    return (
        <ClientsDataProvider>
            <ClientsListRenderer />
        </ClientsDataProvider>
    );
}