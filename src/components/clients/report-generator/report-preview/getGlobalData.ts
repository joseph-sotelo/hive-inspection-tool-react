import config from "@arcgis/core/config";
import { HIVEDROP_FIELD_NAMES } from "@/constants/map";
import { executeQueryJSON } from "@arcgis/core/rest/query";

config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const URL = import.meta.env.VITE_ARCGIS_HIVEDROPS_LAYER_API_URL;

export const getGlobalData = async (
    setAllHiveDrops: (arg: number[][]) => void
) => {     

    const query = {
        outFields: [        
           ...HIVEDROP_FIELD_NAMES.GRADES,
           HIVEDROP_FIELD_NAMES.F_RECORD_ID,
        ],
        where: "1=1",
        returnDistinctValues: true,
        returnGeometry: false,
    };
    
    const results = await executeQueryJSON(URL, query);
    
    // Group features by record ID and combine their grades
    const recordGroups: { [key: string]: number[] } = {};
    
    results.features.forEach((feature) => {
        const recordId = feature.attributes[HIVEDROP_FIELD_NAMES.F_RECORD_ID];
        
        // Initialize array for this record ID if it doesn't exist
        if (!recordGroups[recordId]) {
            recordGroups[recordId] = [];
        }
        
        // Extract all non-null grades from this feature
        HIVEDROP_FIELD_NAMES.GRADES.forEach((gradeField) => {
            const gradeValue = feature.attributes[gradeField];
            if (gradeValue !== null && gradeValue !== undefined) {
                recordGroups[recordId].push(gradeValue);
            }
        });
    });
    
    // Convert to array of arrays and pass to setter
    const allHiveDropGrades = Object.values(recordGroups);
    setAllHiveDrops(allHiveDropGrades);
};

