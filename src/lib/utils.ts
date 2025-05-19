import { ComboBoxType } from "@/components/combobox";
import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

import { useState } from "react";
import { clsx, type ClassValue } from "clsx"
import { useEffect } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// below function is used for getting all of the values for a given field
config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_BASEMAP_API_KEY as string;
const PLANT_URL = "https://services3.arcgis.com/rejQdffKHRccBBY1/arcgis/rest/services/bee_inspector_2023/FeatureServer/0";

export const getvalues = async (outField: string) => {

    const query = {
        outFields: [outField],
        where: "1=1",
        returnDistinctValues: true,
        returnGeometry: false,
    };
    const results = await executeQueryJSON(PLANT_URL, query);
    const values = results.features
        .map((feature) => feature.attributes[outField])
        .filter(Boolean)
        .sort();

    return values;
};

// converts values from getvalues into props for combobox options
export const comboBoxOptions = (outField: string) => {
    const [data, setData] = useState<ComboBoxType>({
        optionsType: outField,
        options: []
      })

      useEffect(() => {
        getvalues(outField).then((values) => {
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
