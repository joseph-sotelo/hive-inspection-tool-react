import OrchardReportDataProvider from "@/context/orchardReportData/OrchardReportData";
import OverviewReportDataProvider from "@/context/overviewReportData/OverviewReportData";
import ReportSidebar from "./report-sidebar";
import ReportPreview from "./report-preview/report-preview";

export const ReportGenerator = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="w-full flex justify-between">
            <OrchardReportDataProvider>
                <OverviewReportDataProvider>
                    <ReportPreview />  
                    <ReportSidebar />   
                </OverviewReportDataProvider>
            </OrchardReportDataProvider>
        </div>
    )
} 