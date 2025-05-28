import { ComboBoxType } from "@/components/combobox";
import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

import { useState } from "react";
import { clsx, type ClassValue } from "clsx"
import { useEffect } from "react";
import { twMerge } from "tailwind-merge"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// below function is used for getting all of the values for a given field
config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_BASEMAP_API_KEY as string;
const URL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_GEOJSON_URL;

export const getValues = async (outField: string) => {

    const query = {
        outFields: [outField],
        where: "1=1",
        returnDistinctValues: true,
        returnGeometry: false,
    };
    const results = await executeQueryJSON(URL, query);
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

// used for confirming the names of fields and attributes of featureLayers by logging them in the console
export const logLayerMetadata = (layerURL: string, layer: FeatureLayer) => {
    // Log the layer's metadata
    fetch(layerURL + "?f=json&token=" + config.apiKey)
      .then(response => response.json())
      .then(data => {
        console.log("Layer Metadata:", data);
      })
      .catch(error => {
        console.error("Error fetching layer metadata:", error);
      });

    // Log the layer's fields
    layer.load().then(() => {
      console.log("Layer Fields:", layer.fields);
    });
}
