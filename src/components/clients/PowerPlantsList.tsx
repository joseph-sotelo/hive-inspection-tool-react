// import { getValues } from '@/lib/utils';
// import PowerPlants from '@/components/clients/clients-list';
// import { useEffect, useState } from 'react';

// export default function PowerPlantsList() {
//   const [data, setData] = useState<PowerPlantData | null>(null);

//   type PowerPlantData = {
//     types: string[];
//   };

//   useEffect(() => {
//     getPowerPlants().then(setData);
//   }, []);

//   return (
//     <>
//       {data && <PowerPlants {...data} />}
//     </>
//   );
// }