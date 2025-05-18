// a combobox with options in the dropdown

import { getClients } from '@/lib/utils';
import { Combobox, ComboBoxType } from '../combobox';
import { useEffect, useState } from 'react';

export default function OptionsBox() {
  const [data, setData] = useState<ComboBoxType>({
    optionsType: "clients",
    options: []
  })


  useEffect(() => {
    getClients().then((values) => {
        const comboBoxOptions = values.map((value) =>({
            label: value as string,
            value: value as string
        }))

        const comboBoxProps = {
            optionsType: "clients",
            options: comboBoxOptions
        }

        setData(comboBoxProps)
    });
  }, []);

  return (
    <>
      {data && <Combobox props={data} />}
    </>
  );
}