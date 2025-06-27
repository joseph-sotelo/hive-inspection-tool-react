// ui
import { WebMap } from "@/components/map";

// used to to alter the map based on inspection data
import InspectionDataProvider from "@/context/inspectionData/InspectionData";

// used to toggle the orchard details sheet on and off
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