import config from "@arcgis/core/config";

config.request.useIdentity = false;
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const URL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_GEOJSON_URL;

export const getOrchardData = async (    
    setStatus: (status: string) => void,
    setHiveCount: (hiveCount: number) => void,
    setAverage: (average: string) => void,
    setFieldmapIdPrimary: (fieldmapIdPrimary: string) => void,
    status: string,
    hiveCount: number,
    orchardGrade: string,
    fieldmapIdPrimary: string
) => {     

    setStatus(status);
    setHiveCount(hiveCount);
    setAverage(orchardGrade);
    setFieldmapIdPrimary(fieldmapIdPrimary);
};