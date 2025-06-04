import config from "@arcgis/core/config";
import { ORCHARD_FIELD_NAMES } from "@/constants/map";
import { executeQueryJSON } from "@arcgis/core/rest/query";

config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const URL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_GEOJSON_URL;

export const getOrchardData = async (    
    setStatus: (status: string) => void,
    setHiveCount: (hiveCount: number) => void,
    setAverage: (average: string) => void,
    setFieldmapIdPrimary: (fieldmapIdPrimary: string) => void,
    setTeamLeader: (teamLeader: string) => void,
    setInspectionDate: (inspectionDate: string) => void,
    setLatitude: (latitude: number) => void,
    setLongitude: (longitude: number) => void,
    status: string,
    hiveCount: number,
    orchardGrade: string,
    fieldmapIdPrimary: string
) => {     

    // select relevant data from clientsData that was already fetched

    setStatus(status);
    setHiveCount(hiveCount);
    setAverage(orchardGrade);
    setFieldmapIdPrimary(fieldmapIdPrimary);    

    const query = {
        outFields: [            
            ORCHARD_FIELD_NAMES.TEAM_LEADER,
            ORCHARD_FIELD_NAMES.INSPECTION_DATE,
            ORCHARD_FIELD_NAMES.LATITUDE,
            ORCHARD_FIELD_NAMES.LONGITUDE
        ],
        where: `fieldmap_id_primary='${fieldmapIdPrimary}'`,
        returnDistinctValues: true,
        returnGeometry: false,
    };
    
    const results = await executeQueryJSON(URL, query);

    setTeamLeader(results.features[0].attributes[ORCHARD_FIELD_NAMES.TEAM_LEADER]);
    setLatitude(results.features[0].attributes[ORCHARD_FIELD_NAMES.LATITUDE]);
    setLongitude(results.features[0].attributes[ORCHARD_FIELD_NAMES.LONGITUDE]);
    // Convert timestamp to readable date format
    const date = results.features[0].attributes[ORCHARD_FIELD_NAMES.INSPECTION_DATE];
    const formattedDate = new Date(date).toLocaleDateString();
    setInspectionDate(formattedDate);    
    
    // // Build local arrays first
    // const newStatuses: string[] = [];
    // const newHiveCounts: number[] = [];
    // const newOrchardGrades: string[] = [];
    // const newFieldmapIdPrimary: string[] = [];

    // results.features.forEach((feature) => {
    //     newStatuses.push(feature.attributes[ORCHARD_FIELD_NAMES.F_STATUS]);
    //     newHiveCounts.push(feature.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]);
    //     newOrchardGrades.push(feature.attributes[ORCHARD_FIELD_NAMES.AVERAGE]);
    //     newFieldmapIdPrimary.push(feature.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY]);
    // });

    // console.log("Query results:", results.features);
    // console.log("Processed data:", { clientName, newStatuses, newHiveCounts, newOrchardGrades });

    // // Replace state with the new arrays (not append)
    // setStatuses(newStatuses);
    // setHiveCounts(newHiveCounts);
    // setOrchardGrades(newOrchardGrades);
    // setFieldmapIdPrimary(newFieldmapIdPrimary);
};