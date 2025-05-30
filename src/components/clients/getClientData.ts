import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";
import { ORCHARD_FIELD_NAMES } from "@/constants/map";

config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const URL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_GEOJSON_URL;

export const getClientData = async (
    clientName: string,
    setName: (name: string) => void,
    statuses: string[],
    setStatuses: (statuses: string[]) => void,
    hiveCounts: number[],
    setHiveCounts: (hiveCounts: number[]) => void,
    orchardGrades: string[],
    setOrchardGrades: (orchardGrades: string[]) => void
) => {
    setName(clientName);

    const query = {
        outFields: [            
            ORCHARD_FIELD_NAMES.F_STATUS,
            ORCHARD_FIELD_NAMES.HIVES_CONTRACTED,
            ORCHARD_FIELD_NAMES.AVERAGE
        ],
        where: `client='${clientName}'`,
        returnDistinctValues: true,
        returnGeometry: false,
    };
    
    const results = await executeQueryJSON(URL, query);
    
    // Build local arrays first
    const newStatuses: string[] = [];
    const newHiveCounts: number[] = [];
    const newOrchardGrades: string[] = [];

    results.features.forEach((feature) => {
        newStatuses.push(feature.attributes[ORCHARD_FIELD_NAMES.F_STATUS]);
        newHiveCounts.push(feature.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]);
        newOrchardGrades.push(feature.attributes[ORCHARD_FIELD_NAMES.AVERAGE]);
    });

    console.log("Query results:", results.features);
    console.log("Processed data:", { clientName, newStatuses, newHiveCounts, newOrchardGrades });

    // Update state with the new arrays
    setStatuses([...statuses, ...newStatuses]);
    setHiveCounts([...hiveCounts, ...newHiveCounts]);
    setOrchardGrades([...orchardGrades, ...newOrchardGrades]);
};