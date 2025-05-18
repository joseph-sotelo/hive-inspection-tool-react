import { getClients } from '../utils';
import Clients from '../components/Clients';
import { useEffect, useState } from 'react';

export default function ClientsList() {
  const [data, setData] = useState<PowerPlantData | null>(null);

  type PowerPlantData = {
    clients: string[];
  };

  useEffect(() => {
    getClients().then(setData);
  }, []);

  return (
    <>
      {data && <Clients {...data} />}
    </>
  );
}