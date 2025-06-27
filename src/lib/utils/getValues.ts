//used for getting all of the values for a given geojson field. Modified from an Esri youtube tutorial.

import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;

const URL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_GEOJSON_URL;

export const getValues = async (outField: string) => {

    // creates query with whatever outfield is passed in
      const query = {
          outFields: [outField],
          where: "1=1",
          returnDistinctValues: true,
          returnGeometry: false,
      };
  
      // queries the json
      const results = await executeQueryJSON(URL, query);
  
      // packages the results
      const values = results.features
          .map((feature) => feature.attributes[outField])
          .filter(Boolean)
          .sort();
  
      return values;
  };