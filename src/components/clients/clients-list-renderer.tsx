import { getValues } from '@/lib/utils/getValues';
import { useEffect, useState } from 'react';
import Clients from './clients-list';

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
      {data && <Clients {...data} />}
    </>
  );
}