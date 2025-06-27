// populates clients-list with data. This programming patter came from a Rene Rubalcava tutorial

import { getValues } from '@/lib/utils/getValues';
import { useEffect, useState } from 'react';
import ClientsList from './clients-list';

export default function ClientsListRenderer() {
  const [data, setData] = useState<ClientsData | null>(null);

  type ClientsData = {
    types: string[];
  };

  useEffect(() => {
    getValues("client").then((values) => {
      setData({ types: values });
    });
  }, []);

  return (
    <>
      {data && <ClientsList {...data} />}
    </>
  );
}