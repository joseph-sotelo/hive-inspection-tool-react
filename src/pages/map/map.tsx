// ui
import { WebMap } from "@/components/map";

// context
import InspectionDataProvider from "@/context/inspectionData/InspectionData";
import OrchardDetailsDataProvider from "@/context/orchardDetailsData/OrchardDetailsData";

export default function Map() {
    return (
        <InspectionDataProvider>
            <OrchardDetailsDataProvider>
                <WebMap />
            </OrchardDetailsDataProvider>
        </InspectionDataProvider>
    );
}