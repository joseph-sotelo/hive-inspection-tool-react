import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

// config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_BASEMAP_API_KEY as string;

const CLIENTS_URL = "https://services3.arcgis.com/rejQdffKHRccBBY1/arcgis/rest/services/bee_inspector_2023/FeatureServer/0";

export const getClients = async () => {

    const query = {
        outFields: ["client"],
        where: "1=1",
        returnDistinctValues: true,
        returnGeometry: false,
    };
    const results = await executeQueryJSON(CLIENTS_URL, query);
    const values = results.features
        .map((feature) => feature.attributes["client"])
        .filter(Boolean)
        .sort();

    const clientsList = { clients: values } as const;
    return clientsList;
};