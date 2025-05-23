import { createContext, useContext, useState } from "react";

type InspectionDataType = {
    isInspectionModeActive: boolean;
    toggleInspectionMode: () => void;
}

export const InspectionDataContext = createContext<InspectionDataType | undefined>(undefined);

export function InspectionDataProvider({ children }: { children: React.ReactNode }) {
    const [isInspectionModeActive, setIsInspectionModeActive] = useState(false);

    const toggleInspectionMode = () => {
        setIsInspectionModeActive(prev => !prev);
    };

    return (
        <InspectionDataContext.Provider value={{ isInspectionModeActive, toggleInspectionMode }}>
            {children}
        </InspectionDataContext.Provider>
    );
}

export function useInspectionDataContext() {
    const inspectionData = useContext(InspectionDataContext);

    if (inspectionData === undefined) {
        throw new Error("useInspectionDataContext must be used with an InspectionDataContext");
    }

    return inspectionData;
}