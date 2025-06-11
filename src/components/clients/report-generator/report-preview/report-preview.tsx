// displays the report pdf preview

import HiveDropReportSubsection from "./hivedrop-report-subsection";
import OrchardReportCover from "./orchard-report-cover";
import IntroReportSection from "./intro-report-section";

export default function ReportPreview() {
    return (
        <div className="overflow-scroll h-screen w-full">        
            <div className="w-full flex flex-col gap-12 items-center py-12 pointer-events-none">            
                    <OrchardReportCover />
                    <IntroReportSection />
                    <HiveDropReportSubsection />            
            </div>
        </div>
    )
}