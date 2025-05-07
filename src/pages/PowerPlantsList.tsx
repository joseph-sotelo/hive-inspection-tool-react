import { getPowerPlants } from '../utils';
import PowerPlants from '../components/ui/PowerPlants';
import { useEffect, useState } from 'react';

export default function PowerPlantsList() {
  const [data, setData] = useState<PowerPlantData | null>(null);

  type PowerPlantData = {
    types: string[];
  };

  useEffect(() => {
    getPowerPlants().then(setData);
  }, []);

  return (
    <>
      {data && <PowerPlants {...data} />}
    </>
  );
}