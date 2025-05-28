import { WebMap } from "@/components/map";
import InspectionDataProvider from "@/context/inspectionData/InspectionData";

export default function Map() {
    return (
        <InspectionDataProvider>
            <WebMap />
        </InspectionDataProvider>
    );
}