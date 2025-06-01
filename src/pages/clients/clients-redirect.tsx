import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getValues } from '@/lib/utils';

export default function ClientsRedirect() {
    const [firstClient, setFirstClient] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getValues("client").then((values) => {
            if (values && values.length > 0) {
                setFirstClient(values[0]);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading clients...</div>;
    }

    if (firstClient) {
        return <Navigate to={`/clients/${encodeURIComponent(firstClient)}`} replace />;
    }

    return <div>No clients found</div>;
} 