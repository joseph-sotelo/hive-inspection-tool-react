import HiveDropReportSubsection from "./hivedrop-report-subsection";
import OrchardReportCover from "./orchard-report-cover";
import OrchardReportPage from "./orchard-report-page";

export default function ReportPreview() {
    return (
        <div className="w-full flex flex-col gap-12 items-center py-12 overflow-scroll h-screen">
            <OrchardReportCover />
            <OrchardReportPage />
            <HiveDropReportSubsection />
        </div>
    )
}