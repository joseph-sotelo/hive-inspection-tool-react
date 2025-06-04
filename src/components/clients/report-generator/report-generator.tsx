import OrchardReportDataProvider from "@/context/orchardReportData/OrchardReportData";
import ReportSidebar from "./report-sidebar";
import PdfViewer from "./pdf-viewer";

export const ReportGenerator = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="w-full flex justify-between">
            <OrchardReportDataProvider>
                <PdfViewer />  
                <ReportSidebar />   
            </OrchardReportDataProvider>
        </div>
    )
} 