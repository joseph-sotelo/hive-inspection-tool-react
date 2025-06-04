import OrchardReportDataProvider from "@/context/orchardReportData/OrchardReportData";
import ReportPreview from "./report-preview";
import ReportSidebar from "./report-sidebar";

export const ReportGenerator = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="w-full flex">
            <OrchardReportDataProvider>
                <ReportPreview />  
                <ReportSidebar />   
            </OrchardReportDataProvider>
        </div>
    )
} 