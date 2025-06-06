// ui
import { Separator } from "@/components/ui/separator";
import ReportSectionGeneral from "./report-section-general";
import ReportSectionInspection from "./report-section-inspection";

export default function OrchardReportPage() {         

       
    
    return (  
        <div className="w-[8.5in] h-[11in] border-2 border-border p-6">            
            <ReportSectionGeneral />                        
            <Separator />
            <ReportSectionInspection />
        </div>
    )
}