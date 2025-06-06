import HiveDropReportSubsection from "./hivedrop-report-subsection";
import OrchardReportCover from "./orchard-report-cover";
import OrchardReportPage from "./orchard-report-page";

export default function ReportPreview() {
    return (
        <div className="w-full flex flex-col gap-6 justify-center pt-6">
            <OrchardReportCover />
            <OrchardReportPage />   
            <HiveDropReportSubsection />      
        </div>
    )
}