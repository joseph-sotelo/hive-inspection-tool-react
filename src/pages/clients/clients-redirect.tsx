// this page is used to ensure that the site's url is never '/clients/', which would be not founr, but rather '/clients/[client name]'

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// used to get a list of all client names found in our geojson
import { getValues } from '@/lib/utils/getValues';

export default function ClientsRedirect() {
    const [firstClient, setFirstClient] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // used to get the name of the first so that the first client can be shown by default
    useEffect(() => {
        getValues("client").then((values) => {
            if (values && values.length > 0) {
                setFirstClient(values[0]);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading clients...</div>;
    }

    if (firstClient) {
        return <Navigate to={`/clients/${encodeURIComponent(firstClient)}`} replace />;
    }

    return <div>No clients found</div>;
} 