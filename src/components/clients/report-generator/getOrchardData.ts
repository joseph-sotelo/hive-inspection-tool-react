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
    setRecordId: (recordId: string) => void,
    setFieldmapIdAuxiliary: (fieldmapIdAuxiliary: string) => void,
    setPartdeliv_yn: (partdeliv_yn: string) => void,
    setBeeBroker: (beeBroker: string) => void,
    setDeliveryDate: (deliveryDate: string) => void,
    setBeekeeper: (beekeeper: string) => void,
    setAvgContracted: (avgContracted: number) => void,
    setMinimum: (minimum: number) => void,
    setAssistants: (assistants: string) => void,
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
            ORCHARD_FIELD_NAMES.LONGITUDE,
            ORCHARD_FIELD_NAMES.F_RECORD_ID,
            ORCHARD_FIELD_NAMES.FIELDMAP_ID_AUXILIARY,
            ORCHARD_FIELD_NAMES.PARTDELIV_YN,
            ORCHARD_FIELD_NAMES.BEE_BROKER,
            ORCHARD_FIELD_NAMES.DATE_PARTDELIV,
            ORCHARD_FIELD_NAMES.DATE_FULLDELIV,
            ORCHARD_FIELD_NAMES.BEEKEEPER,
            ORCHARD_FIELD_NAMES.AVG_CONTRACTED,
            ORCHARD_FIELD_NAMES.MINIMUM,
            ORCHARD_FIELD_NAMES.ASSISTANTS
        ],
        where: `fieldmap_id_primary='${fieldmapIdPrimary}'`,
        returnDistinctValues: true,
        returnGeometry: false,
    };
    
    const results = await executeQueryJSON(URL, query);

    setTeamLeader(results.features[0].attributes[ORCHARD_FIELD_NAMES.TEAM_LEADER]);
    setLatitude(results.features[0].attributes[ORCHARD_FIELD_NAMES.LATITUDE]);
    setLongitude(results.features[0].attributes[ORCHARD_FIELD_NAMES.LONGITUDE]);
    setRecordId(results.features[0].attributes[ORCHARD_FIELD_NAMES.F_RECORD_ID]);
    setFieldmapIdAuxiliary(results.features[0].attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_AUXILIARY]);
    setPartdeliv_yn(results.features[0].attributes[ORCHARD_FIELD_NAMES.PARTDELIV_YN]);
    setBeeBroker(results.features[0].attributes[ORCHARD_FIELD_NAMES.BEE_BROKER]);
    setBeekeeper(results.features[0].attributes[ORCHARD_FIELD_NAMES.BEEKEEPER]);
    setAvgContracted(results.features[0].attributes[ORCHARD_FIELD_NAMES.AVG_CONTRACTED]);
    setMinimum(results.features[0].attributes[ORCHARD_FIELD_NAMES.MINIMUM]);
    if (results.features[0].attributes[ORCHARD_FIELD_NAMES.DATE_PARTDELIV] === null) {
        setDeliveryDate(formatDate(results.features[0].attributes[ORCHARD_FIELD_NAMES.DATE_FULLDELIV]));
    } else {
        setDeliveryDate(formatDate(results.features[0].attributes[ORCHARD_FIELD_NAMES.DATE_PARTDELIV]));
    }
    setInspectionDate(formatDate(results.features[0].attributes[ORCHARD_FIELD_NAMES.INSPECTION_DATE]));    
    setAssistants(results.features[0].attributes[ORCHARD_FIELD_NAMES.ASSISTANTS]);

};

const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
}