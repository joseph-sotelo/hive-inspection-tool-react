import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

// config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_BASEMAP_API_KEY as string;

const PLANT_URL = "https://services3.arcgis.com/rejQdffKHRccBBY1/arcgis/rest/services/bee_inspector_2023/FeatureServer/0";

let cachedData: { types: string[] } | null = null;

export const getPowerPlants = async () => {
    if (cachedData) {
        return cachedData;
    }

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

    cachedData = { types: values } as const;
    return cachedData;
};