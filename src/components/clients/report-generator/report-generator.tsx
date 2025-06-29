// page containing everything needed to generate a report, including the pdf preview and the options sidebar

import OrchardReportDataProvider from "@/context/orchardReportData/OrchardReportData";
import OverviewReportDataProvider from "@/context/overviewReportData/OverviewReportData";
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