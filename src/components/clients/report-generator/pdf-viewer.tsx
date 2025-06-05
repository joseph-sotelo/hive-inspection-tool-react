import OrchardReportCover from "./orchard-report-cover";
import OrchardReportPage from "./orchard-report-page";

export default function PdfViewer() {
    return (
        <div className="w-full flex flex-col justify-center pt-6">
            <OrchardReportCover />
            <OrchardReportPage />         
        </div>
    )
}