import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// below function will be used to get all of the client names. Modified from this tutorial: https://www.youtube.com/watch?v=CjtDYdNr_iE&t=1621s
config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_BASEMAP_API_KEY as string;
const PLANT_URL = "https://services3.arcgis.com/rejQdffKHRccBBY1/arcgis/rest/services/bee_inspector_2023/FeatureServer/0";

export const getClients = async () => {

    const query = {
        outFields: ["client"],
        where: "1=1",
        returnDistinctValues: true,
        returnGeometry: false,
    };
    const results = await executeQueryJSON(PLANT_URL, query);
    const values = results.features
        .map((feature) => feature.attributes["client"])
        .filter(Boolean)
        .sort();

    return values;
};
