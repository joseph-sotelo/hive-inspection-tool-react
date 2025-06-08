// ui
import { Separator } from "@/components/ui/separator";
import ReportSectionGeneral from "./report-section-general";
import ReportSectionInspection from "./report-section-inspection";
import OverviewSubsection from "./overview-subsection";

export default function OrchardReportPage() {         

    return (  
        <div className="w-[8.5in] h-[11in] border-1 shadow-lg border-border p-12 flex flex-col gap-4">            
            <ReportSectionGeneral />                        
            <Separator />
            <ReportSectionInspection />              
            <OverviewSubsection />              
        </div>
    )
}