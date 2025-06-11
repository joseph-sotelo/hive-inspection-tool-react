// contains report preview and sidebar for customizing the preview

// context
import OrchardReportDataProvider from "@/context/orchardReportData/OrchardReportData";
import OverviewReportDataProvider from "@/context/overviewReportData/OverviewReportData";

// UI
import ReportSidebar from "./report-sidebar";
import ReportPreview from "./report-preview/report-preview";

export const ReportGenerator = () => {
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