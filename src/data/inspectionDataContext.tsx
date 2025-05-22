import { createContext, useContext } from "react";

type InspectionDataType = {
    isInspectionModeActive: boolean
}

export const InspectionDataContext = createContext<InspectionDataType | undefined>(undefined);

export function useInspectionDataContext(){
    const inspectionData = useContext(InspectionDataContext);

    if (inspectionData === undefined){
        throw new Error("useInspectionDataContext must be used with an InspectionDataContext");
    }

    return inspectionData;
}