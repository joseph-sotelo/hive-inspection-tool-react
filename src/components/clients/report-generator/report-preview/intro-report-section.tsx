// ui
import { Separator } from "@/components/ui/separator";
import GeneralReportSection from "./general-report-section";
import TeamReportSection from "./team-report-section";
import OverviewSubsection from "./overview-subsection";

export default function IntroReportSection() {         

    return (  
        <div className="w-[8.5in] h-[1056px] border-1 shadow-lg border-border p-6 flex flex-col gap-8">            
            <GeneralReportSection />                        
            <Separator />
            <TeamReportSection />              
            <OverviewSubsection />              
        </div>
    )
}