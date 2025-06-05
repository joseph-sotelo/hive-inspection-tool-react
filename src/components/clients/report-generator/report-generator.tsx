import OrchardReportDataProvider from "@/context/orchardReportData/OrchardReportData";
import ReportSidebar from "./report-sidebar";
import ReportPreview from "./report-preview/report-preview";

export const ReportGenerator = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="w-full flex justify-between">
            <OrchardReportDataProvider>
                <ReportPreview />  
                <ReportSidebar />   
            </OrchardReportDataProvider>
        </div>
    )
} 