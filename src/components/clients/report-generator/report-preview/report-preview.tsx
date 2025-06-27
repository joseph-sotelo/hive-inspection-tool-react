// combines the report sections and displays them as a report pdf preview

import HiveDropReportSubsection from "./hivedrop-report-subsection";
import OrchardReportCover from "./orchard-report-cover";
import OrchardReportPage from "./orchard-report-page";

export default function ReportPreview() {
    return (
        <div className="overflow-scroll h-screen w-full bg-background-secondary">        
            <div className="w-full flex flex-col gap-12 items-center py-12 pointer-events-none">            
                <OrchardReportCover />
                <OrchardReportPage />
                <HiveDropReportSubsection />            
            </div>
        </div>
    )
}