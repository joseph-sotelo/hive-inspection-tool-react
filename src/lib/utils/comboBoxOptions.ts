// types
import { ComboBoxType } from "@/components/ui/combobox";

// hooks
import { useState } from "react";
import { useEffect } from "react";

import { getValues } from "./getValues";

// converts values from getvalues into props for combobox options
export const comboBoxOptions = (outField: string) => {
    const [data, setData] = useState<ComboBoxType>({
        optionsType: outField,
        options: []
      })

      useEffect(() => {
        getValues(outField).then((values) => {
            const comboBoxOptions = values.map((value) =>({
                label: value as string,
                value: value as string
            }))
    
            const comboBoxProps = {
                optionsType: outField,
                options: comboBoxOptions
            }
    
            setData(comboBoxProps)
        });
      }, []);

      return data
}