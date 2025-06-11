// used to get the data about an individual client's orchards. Parent component applies the data to context (ClientsData.tsx), then it is displayed in client-details.tsx

// arcgis
import config from "@arcgis/core/config";
import { executeQueryJSON } from "@arcgis/core/rest/query";

// constants
import { ORCHARD_FIELD_NAMES } from "@/constants/map";

// arcgis config
config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const URL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_GEOJSON_URL;

export const getClientData = async (
    clientName: string,
    setName: (name: string) => void,    
    setStatuses: (statuses: string[]) => void,
    setHiveCounts: (hiveCounts: number[]) => void,    
    setOrchardGrades: (orchardGrades: string[]) => void,    
    setDefinitionExpression: (definitionExpression: string) => void,
    setFieldmapIdPrimary: (fieldmapIdPrimary: string[]) => void
) => {
    setName(clientName);
    setDefinitionExpression(`client='${clientName}'`);
    const query = {
        outFields: [            
            ORCHARD_FIELD_NAMES.F_STATUS,
            ORCHARD_FIELD_NAMES.HIVES_CONTRACTED,
            ORCHARD_FIELD_NAMES.AVERAGE,
            ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY
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
    const newFieldmapIdPrimary: string[] = [];

    // loop through each feature and apply their values to the local arrays.
    results.features.forEach((feature) => {
        newStatuses.push(feature.attributes[ORCHARD_FIELD_NAMES.F_STATUS]);
        newHiveCounts.push(feature.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]);
        newOrchardGrades.push(feature.attributes[ORCHARD_FIELD_NAMES.AVERAGE]);
        newFieldmapIdPrimary.push(feature.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY]);
    });

    // Replace state with the new arrays (not append)
    setStatuses(newStatuses);
    setHiveCounts(newHiveCounts);
    setOrchardGrades(newOrchardGrades);
    setFieldmapIdPrimary(newFieldmapIdPrimary);

    
};